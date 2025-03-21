// region Imports
import { ProductBase } from '../../../api/productBase';
import { ITask, taskSch } from './taskSch';
import { IMeteorError } from '/imports/typings/IMeteorError';

class TaskApi extends ProductBase<ITask> {
	constructor() {
		super('task', taskSch, {
			enableCallMethodObserver: true,
			enableSubscribeObserver: true
		});
	}
	fillDatabae = (limit: number, callback: (error: IMeteorError, result: Array<string>) => void) =>
		this.callMethod('fillDatabae', limit, callback);
}

export const taskApi = new TaskApi();
