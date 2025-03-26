import React, { useCallback } from 'react';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';

import { hasValue } from '/imports/libs/hasValue';
import TaskListController from './pages/taskList/taskListController';
import TaskDetailController from './pages/taskDetail/taskDetailContoller';
import { TaskListView } from './pages/taskList/taskListView';

export interface ITaskModuleContext {
	state?: 'create' | 'view' | 'edit';
	id?: string;
}

export const TaskModuleContext = React.createContext<ITaskModuleContext>({});

export default (props: IDefaultContainerProps) => {
	let { screenState, taskId } = useParams();
	const state = screenState ?? props.screenState;
	const id = taskId ?? props.id;

	const validState = ['view', 'edit', 'create'];
	const isValideState = hasValue(state) && validState.includes(state!);

	const renderPage = useCallback(() => {
		if (!isValideState) return <TaskListView />;
		return <TaskDetailController />;
	}, [isValideState]);

	const providerValue = {
		state: !isValideState ? undefined : (state as 'create' | 'view' | 'edit' | undefined),
		id
	};
	return <TaskModuleContext.Provider value={providerValue}>{renderPage()}</TaskModuleContext.Provider>;
};
