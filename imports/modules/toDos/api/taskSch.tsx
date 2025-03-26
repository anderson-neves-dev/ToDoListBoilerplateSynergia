import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';
import { hasValue } from '/imports/libs/hasValue';

export const taskSch: ISchema<ITask> = {
	title: {
		type: String,
		label: 'Titulo',
		optional: false
	},
	description: {
		type: String,
		label: 'Descrição',
		optional: false
	},
	check: {
		type: Boolean,
		label: 'Concluída',
		optional: true
	},
	type: {
		type: String,
		label: 'Tipo',
		optional: false,
		options: () => [
			{ value: 'public', label: 'Tarefa para o time' },
			{ value: 'private', label: 'Pessoal' }
		]
	}
};

export interface ITask extends IDoc {
	title: string;
	description: string;
	type: string;
	check: boolean;
	username?: string;
}
