import React, { createContext, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '/imports/typings/ISchema';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import { ITask } from '../../api/taskSch';
import { TaskModuleContext } from '../../taskContainer';
import { taskApi } from '../../api/taskApi';
import TaskDetailView from './taskDetailView';
import TaskListView from '../taskList/taskListView';

interface ITaskDetailContollerContext {
	closePage: () => void;
	document: ITask;
	loading: boolean;
	schema: ISchema<ITask>;
	onSubmit: (doc: ITask) => void;
	changeToEdit: (id: string) => void;
}

export const TaskDetailControllerContext = createContext<ITaskDetailContollerContext>(
	{} as ITaskDetailContollerContext
);

const TaskDetailController = () => {
	const navigate = useNavigate();
	const { id, state } = useContext(TaskModuleContext);
	const { showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);

	const { document, loading } = useTracker(() => {
		const subHandle = !!id ? taskApi.subscribe('taskDetail', { _id: id }) : null;
		const document = id && subHandle?.ready() ? taskApi.findOne({ _id: id }) : {};
		return {
			document: (document as ITask) ?? ({ _id: id } as ITask),
			loading: !!subHandle && !subHandle?.ready()
		};
	}, [id]);

	const closePage = useCallback(() => navigate(-1), []);
	const changeToEdit = useCallback((id: string) => navigate(`/task/edit/${id}`), []);

	const onSubmit = useCallback((doc: ITask) => {
		const selectedAction = state === 'create' ? 'insert' : 'update';
		if (selectedAction === 'insert') {
			doc = { ...doc, check: false };
		}
		taskApi[selectedAction](doc, (e: IMeteorError) => {
			if (e)
				return showNotification({
					type: 'error',
					title: 'Operação não realizada!',
					message: `Erro ao realizar a operação: ${e.reason}`
				});
			closePage();
			showNotification({
				type: 'success',
				title: 'Operação realizada!',
				message: `O exemplo foi ${selectedAction === 'update' ? 'atualizado' : 'cadastrado'} com sucesso!`
			});
		});
	}, []);

	return (
		<TaskDetailControllerContext.Provider
			value={{
				closePage,
				document: { ...document, _id: id },
				loading,
				schema: taskApi.getSchema(),
				onSubmit,
				changeToEdit
			}}>
			{<TaskDetailView />}
		</TaskDetailControllerContext.Provider>
	);
};

export default TaskDetailController;
