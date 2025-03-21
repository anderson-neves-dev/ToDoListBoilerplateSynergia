import React, { useContext } from 'react';

import TaskDetailStyles from './taskDetailStyles';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { SysDatePickerField } from '/imports/ui/components/sysFormFields/sysDatePickerField/sysDatePickerField';
import { TaskDetailControllerContext } from './taskDetailContoller';
import { TaskModuleContext } from '../../taskContainer';

const TaskDetailView = () => {
	const controller = useContext(TaskDetailControllerContext);
	const { state } = useContext(TaskModuleContext);
	const isView = state === 'view';
	const isEdit = state === 'edit';
	const isCreate = state === 'create';
	const { Container, Body, Header, Footer, FormColumn, Image } = TaskDetailStyles;

	return (
		<Container>
			<Header>
				{isView && (
					<IconButton onClick={controller.closePage}>
						<SysIcon name={'arrowBack'} />
					</IconButton>
				)}
				<Typography variant="h5" sx={{ flexGrow: 1 }}>
					{isCreate ? 'Adicionar tarefa' : isEdit ? 'Editar tarefa' : 'Detalhes da tarefa'}
				</Typography>
				<IconButton
					onClick={!isView ? controller.closePage : () => controller.changeToEdit(controller.document._id || '')}>
					{!isView ? <SysIcon name={'close'} /> : <SysIcon name={'edit'} />}
				</IconButton>
			</Header>
			<SysForm
				mode={state}
				schema={controller.schema}
				doc={controller.document}
				onSubmit={controller.onSubmit}
				loading={controller.loading}>
				<Body>
					<FormColumn>
						<SysTextField name={'title'} placeholder={'Ex.: Tarefa de Casa'} />
						<SysTextField name={'description'} placeholder={'Ex.: Assunto para a prova'} />
						<SysSelectField name={'type'} placeholder={'Selecionar'} />
					</FormColumn>
				</Body>
				<Footer>
					{!isView && (
						<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={controller.closePage}>
							Cancelar
						</Button>
					)}
					<SysFormButton>Salvar</SysFormButton>
				</Footer>
			</SysForm>
		</Container>
	);
};

export default TaskDetailView;
