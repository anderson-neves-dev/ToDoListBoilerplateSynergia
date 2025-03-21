import AniversarioContainer from '../aniversarioContainer';
import { Recurso } from './recursos';
import { IRoute } from '/imports/modules/modulesTypings';

export const aniversarioRouterList: (IRoute | null)[] = [
	{
		path: '/aniversarios/:screenState/:aniversarioId',
		component: AniversarioContainer,
		isProtected: true,
		resources: [Recurso.ANIVERSARIO_VIEW]
	},
	{
		path: '/aniversarios/:screenState',
		component: AniversarioContainer,
		isProtected: true,
		resources: [Recurso.ANIVERSARIO_CREATE]
	},
	{
		path: '/aniversarios',
		component: AniversarioContainer,
		isProtected: true,
		resources: [Recurso.ANIVERSARIO_VIEW]
	}
];
