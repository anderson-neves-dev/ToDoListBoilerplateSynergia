import { IRoute } from '../../modulesTypings';
import taskContainer from '../taskContainer';
import { Recurso } from './recursos';

export const taskRounterList: (IRoute | null)[] = [
	{
		path: '/tasks/:screenState/:taskId',
		component: taskContainer,
		isProtected: true,
		resources: [Recurso.TASK_VIEW]
	},
	{
		path: '/tasks/:screenState',
		component: taskContainer,
		isProtected: true,
		resources: [Recurso.TASK_CREATE]
	},
	{
		path: '/tasks',
		component: taskContainer,
		isProtected: true,
		resources: [Recurso.TASK_VIEW]
	},
	{
		path: '/tasks/',
		component: taskContainer,
		isProtected: true,
		resources: [Recurso.TASK_VIEW]
	}
];
