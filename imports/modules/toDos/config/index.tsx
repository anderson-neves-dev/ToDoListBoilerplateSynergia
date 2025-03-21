import { IModuleHub } from '../../modulesTypings';
import { taskMenuItemList } from './taskAppMenu';
import { taskRounterList } from './taskRounters';

const Task: IModuleHub = {
	pagesRouterList: taskRounterList,
	pagesMenuItemList: taskMenuItemList
};

export default Task;
