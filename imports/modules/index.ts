import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import UserProfile from './userprofile/config';
import Task from './toDos/config';

const pages: Array<IRoute | null> = [...UserProfile.pagesRouterList, ...Task.pagesRouterList];

const menuItens: Array<IAppMenu | null> = [...UserProfile.pagesMenuItemList, ...Task.pagesMenuItemList];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
