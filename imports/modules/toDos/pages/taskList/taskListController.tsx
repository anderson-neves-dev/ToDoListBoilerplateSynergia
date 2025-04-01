import React, { useCallback, useContext, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '/imports/typings/ISchema';
import { ITask } from '../../api/taskSch';
import { taskApi } from '../../api/taskApi';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { IMeteorError } from '/imports/typings/IMeteorError';
import AuthContext from '/imports/app/authProvider/authContext';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface ITaskListContollerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (row: any) => void;
	tasksConcluidas: ITask[];
	tasksNaoConcluidas: ITask[];
	tasksRecent: ITask[];
	schema: ISchema<any>;
	loading: boolean;
	loadingTaskRecente: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: string) => void;
	onAddItemClick: () => void;
	onCheckTask: (doc: ITask) => void;
}

export const TaskListControllerContext = React.createContext<ITaskListContollerContext>(
	{} as ITaskListContollerContext
);

const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: false },
	filter: { type: 'private' },
	searchBy: null,
	viewComplexTable: false
};

interface TaskListControllerProps {
	children: React.ReactNode;
}

const TaskListController: React.FC<TaskListControllerProps> = ({ children }) => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const { showNotification } = useContext(AppLayoutContext);
	const { user } = useContext(AuthContext);
	console.log({ user });
	const { title, description, type } = taskApi.getSchema();
	const taskSchReduzido = { title, description, type };
	const navigate = useNavigate();

	let { sortProperties, filter } = config;
	filter = { ...filter, $or: [{ type: 'public' }, { createdby: user?._id }] };
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};
	console.log({ sort });

	const { loading, tasksConcluidas, tasksNaoConcluidas } = useTracker(() => {
		const subHandle = taskApi.subscribe('taskList', filter, {
			sort
		});
		const tasksConcluidas = subHandle?.ready() ? taskApi.find({ ...filter, check: true }, { sort }).fetch() : [];
		const tasksNaoConcluidas = subHandle?.ready() ? taskApi.find({ ...filter, check: false }, { sort }).fetch() : [];
		return {
			tasksConcluidas,
			tasksNaoConcluidas,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : tasksNaoConcluidas.length + tasksConcluidas.length
		};
	}, [config]);

	const { loadingTaskRecente, tasksRecent } = useTracker(() => {
		const subHandle = taskApi.subscribe('taskList');

		const tasksRecent = subHandle?.ready() ? taskApi.find({}, { sort: { createdat: -1 }, limit: 5 }).fetch() : [];
		return {
			tasksRecent,

			loading: !!subHandle && !subHandle.ready()
		};
	}, [config]);

	const onAddItemClick = () => {
		taskApi.fillDatabae(10, (error, result) => {
			if (error)
				return showNotification({
					type: 'error',
					title: 'Não foi possível adicionar os itens',
					message: `Erro: ${error}`
				});
			showNotification({
				type: 'success',
				title: 'Itens adicionados com sucesso',
				message: `Foram adicionados os seguintes itens: ${result.map((item) => item).join(', ')}`
			});
		});
	};
	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/tasks/create/${newDocumentId}`);
	}, []);

	const onDeleteButtonClick = useCallback((row: any) => {
		console.log('Removendo', row);
		taskApi.remove(row);
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, title: { $regex: value.trim(), $options: 'i' } }
			}));
		}, 100);
		return () => clearTimeout(delayedSearch);
	}, []);

	const onSelectedCategory = useCallback((type: string) => {
		if (!type) {
			setConfig((prev) => ({
				...prev,
				filter: {
					...prev.filter,
					type: { $regex: type.trim(), $options: 'i' }
				}
			}));
			return;
		}
		setConfig((prev) => ({ ...prev, filter: { ...prev.filter, type: type } }));
	}, []);

	const onCheckTask = useCallback((doc: ITask) => {
		taskApi['update'](doc, (e: IMeteorError) => {
			if (e)
				return showNotification({
					horizontal: 'right',
					vertical: 'top',
					type: 'error',
					title: 'Operação não realizada!',
					message: `Erro ao realizar a operação: ${e.reason}`
				});
			showNotification({
				horizontal: 'right',
				vertical: 'top',
				type: 'success',
				title: 'Operação realizada!',
				message: `O exemplo foi ${'update' === 'update' ? 'atualizado' : 'cadastrado'} com sucesso!`
			});
		});
	}, []);

	const providerValues: ITaskListContollerContext = useMemo(
		() => ({
			onAddButtonClick,
			onDeleteButtonClick,
			tasksRecent,
			tasksConcluidas,
			tasksNaoConcluidas,
			schema: taskSchReduzido,
			loading,
			onChangeTextField,
			onChangeCategory: onSelectedCategory,
			onAddItemClick,
			onCheckTask
		}),
		[tasksConcluidas, tasksRecent, loading]
	);

	return <TaskListControllerContext.Provider value={providerValues}>{children}</TaskListControllerContext.Provider>;
};

export default TaskListController;
