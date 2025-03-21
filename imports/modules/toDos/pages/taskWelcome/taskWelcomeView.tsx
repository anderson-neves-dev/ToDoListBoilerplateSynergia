import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { useNavigate } from 'react-router-dom';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import { TaskListControllerContext } from './taskListController';
import TaskListStyles from './taskWelcomeStyles';
import { Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import { ITask } from '../../api/taskSch';
import { ListTaskView } from '../../components/listTask/listTaskView';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import { TaskDetailControllerContext } from '../taskDetail/taskDetailContoller';
import { SysTabs } from '/imports/ui/components/sysTabs/sysTabs';
import FormDialog from '/imports/ui/appComponents/showDialog/custom/formDialog/formDialog';
const TaskWelcomeView = () => {
	const controller = useContext(TaskListControllerContext);

	const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
	const navigate = useNavigate();
	const { Container, LoadingContainer, SearchContainer, ListStyled } = TaskListStyles;
	const abas = [
		{
			label: 'Minhas Tarefas',
			value: 'private'
		},
		{
			label: 'Tarefas do Time',
			value: 'public'
		}
	];
	const [selectedTab, setSelectedTab] = useState(abas[0].value);

	const [open, setOpen] = useState(false);

	// Dados de exemplo para exibição
	const formData = {
		name: 'John Doe',
		email: 'john.doe@example.com'
	};

	// Função para abrir o diálogo
	const handleOpenDialog = () => setOpen(true);

	// Função para fechar o diálogo
	const handleCloseDialog = () => setOpen(false);
	return (
		<Container>
			<SysTabs
				abas={abas}
				value={selectedTab}
				handleChange={(event, newValue) => {
					setSelectedTab(newValue);
					controller.onChangeCategory(newValue);
				}}
			/>
			<SearchContainer>
				<SysTextField
					name="search"
					placeholder="Pesquisar por nome"
					onChange={controller.onChangeTextField}
					startAdornment={<SysIcon name={'search'} />}
				/>
			</SearchContainer>
			{/* <Button onClick={controller.onAddItemClick}>Adicionar</Button> */}
			{controller.loading ? (
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			) : (
				<Box sx={{ width: '100%' }}>
					<ListTaskView
						taskList={controller.tasksNaoConcluidas}
						title="Não Concluídas"
						onEdit={(row) => navigate('/tasks/edit/' + row._id)}
						onDeleteClick={(row) => {
							DeleteDialog({
								showDialog: sysLayoutContext.showDialog,
								closeDialog: sysLayoutContext.closeDialog,
								title: `Excluir dado ${row.title}`,
								message: `Tem certeza que deseja excluir o arquivo ${row.title}?`,
								onDeleteConfirm: () => {
									console.log({ row });
									controller.onDeleteButtonClick(row);
									sysLayoutContext.showNotification({
										message: 'Excluído com sucesso!'
									});
								}
							});
						}}
						onCheckTask={controller.onCheckTask}
					/>
					<ListTaskView
						taskList={controller.tasksConcluidas}
						title="Concluídas"
						onEdit={(row) => navigate('/tasks/edit/' + row._id)}
						onDeleteClick={(row) => {
							DeleteDialog({
								showDialog: sysLayoutContext.showDialog,
								closeDialog: sysLayoutContext.closeDialog,
								title: `Excluir dado ${row.title}`,
								message: `Tem certeza que deseja excluir o arquivo ${row.title}?`,
								onDeleteConfirm: () => {
									console.log({ row });
									controller.onDeleteButtonClick(row);
									sysLayoutContext.showNotification({
										message: 'Excluído com sucesso!'
									});
								}
							});
						}}
						onCheckTask={controller.onCheckTask}
					/>
					<Button onClick={() => sysLayoutContext.showDialog}>sss</Button>
				</Box>
			)}
			<SysFab
				variant="extended"
				text="Adicionar"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				onClick={controller.onAddButtonClick}
			/>
		</Container>
	);
};

export default TaskWelcomeView;
