// region Imports
import { IUserProfile } from '../../userprofile/api/userProfileSch';
import { Recurso } from '../config/recursos';
import { ITask, taskSch } from './taskSch';
import { ProductServerBase } from '/imports/api/productServerBase';
import { IContext } from '/imports/typings/IContext';
import { userprofileServerApi } from '../../../modules/userprofile/api/userProfileServerApi';

// endregion

class TaskServerApi extends ProductServerBase<ITask> {
	constructor() {
		super('task', taskSch, { resources: Recurso });

		const self = this;
		this.addTransformedPublication(
			'taskList',
			async (filter = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { title: 1, description: 1, type: 1, createAt: 1, check: 1, createdby: 1 } // Add `createdby` field
				});
			},
			async (doc: Partial<ITask>): Promise<Partial<ITask & { username: string }>> => {
				if (!doc.createdby) {
					console.error('ERROR: campo createdby está faltando no documento:', doc);
					return { ...doc, username: 'Indefinido' };
				}

				const user: IUserProfile = await userprofileServerApi.getCollectionInstance().findOneAsync(
					{
						_id: doc.createdby
					},
					{
						fields: { username: 1 }
					}
				);

				return { ...doc, username: user?.username || 'Usuário indefinido' };
			}
		);

		this.addPublication('taskDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {
				projection: { title: 1, description: 1, type: 1, createAt: 1 }
			});
		});

		this.registerMethod('fillDatabae', this.fillDatabase.bind(this));
	}
	public fillDatabase(limit: number, _context: IContext): Array<string> {
		const getObject = (index: number): Partial<ITask> => ({
			title: `Tarefa ${index}`,
			description: 'Teste',
			type: 'public',
			check: false
		});

		const taskNames: Array<string> = [];

		for (let i = 0; i < limit; i++) {
			const task = getObject(i);
			this.serverInsert(task, _context);
			taskNames.push(task?.title || 'ERROR');
		}

		return taskNames;
	}
}

export const taskServerApi = new TaskServerApi();
