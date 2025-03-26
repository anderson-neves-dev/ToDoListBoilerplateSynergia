import React, { useCallback, useContext, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '/imports/typings/ISchema';
import { ITask } from '../../api/taskSch';
import { taskApi } from '../../api/taskApi';
import TaskListView from './taskWelcomeView';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { IMeteorError } from '/imports/typings/IMeteorError';
import TaskWelcomeView from './taskWelcomeView';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface ITaskWelcomeContollerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (row: any) => void;
	tasks: ITask[];
	schema: ISchema<any>;
	loading: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: string) => void;
	onAddItemClick: () => void;
	onCheckTask: (doc: ITask) => void;
}

export const TaskWelcomeControllerContext = React.createContext<ITaskWelcomeContollerContext>(
	{} as ITaskWelcomeContollerContext
);

const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: { type: 'private' },
	searchBy: null,
	viewComplexTable: false
};

const TaskWelcomeController = () => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const { showNotification } = useContext(AppLayoutContext);

	const { title, description, type } = taskApi.getSchema();
	const taskSchReduzido = { title, description, type };
	const navigate = useNavigate();

	const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

	const { loading, tasks } = useTracker(() => {
		const subHandle = taskApi.subscribe('taskWelcome', filter, {
			sort
		});
		const tasks = subHandle?.ready() ? taskApi.find({ ...filter, check: true }, { sort }).fetch() : [];
		return {
			tasks,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : tasks.length
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

	const providerValues: ITaskWelcomeContollerContext = useMemo(
		() => ({
			onAddButtonClick,
			onDeleteButtonClick,
			tasks,
			schema: taskSchReduzido,
			loading,
			onChangeTextField,
			onChangeCategory: onSelectedCategory,
			onAddItemClick,
			onCheckTask
		}),
		[tasks, loading]
	);

	return (
		<TaskWelcomeControllerContext.Provider value={providerValues}>
			<TaskWelcomeView />
		</TaskWelcomeControllerContext.Provider>
	);
};

export default TaskWelcomeController;
