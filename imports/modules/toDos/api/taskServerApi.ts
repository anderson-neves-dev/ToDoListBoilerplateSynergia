// region Imports
import { Recurso } from '../config/recursos';
import { ITask, taskSch } from './taskSch';
import { ProductServerBase } from '/imports/api/productServerBase';
import { IContext } from '/imports/typings/IContext';

// endregion

class TaskServerApi extends ProductServerBase<ITask> {
	constructor() {
		super('task', taskSch, { resources: Recurso });

		const self = this;

		this.addPublication('taskList', (filter = {}) => {
			return this.defaultListCollectionPublication(filter, {
				projection: { title: 1, description: 1, type: 1, createAt: 1, check: 1 }
			});
		});

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
