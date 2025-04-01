import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { useNavigate } from 'react-router-dom';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import TaskListController, { TaskListControllerContext } from './taskListController';
import TaskListStyles from './taskListStyles';
import { ListTaskView } from '../../components/listTask/listTaskView';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import { SysTabs } from '/imports/ui/components/sysTabs/sysTabs';
import { TaskView } from '../../components/takView/TaskView';

const App = () => {
	const controller = useContext(TaskListControllerContext);
	const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
	const navigate = useNavigate();
	const { Container, LoadingContainer, SearchContainer, TabsBorder } = TaskListStyles;
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

	return (
		<Container>
			<TabsBorder>
				<SysTabs
					abas={abas}
					value={selectedTab}
					handleChange={(event, newValue) => {
						setSelectedTab(newValue);
						controller.onChangeCategory(newValue);
					}}
				/>
			</TabsBorder>
			<SearchContainer>
				<SysTextField
					name="search"
					placeholder="Pesquisar por título"
					onChange={controller.onChangeTextField}
					startAdornment={<SysIcon name={'search'} />}
					sxMap={{ textField: { ':hover': { backgroundColor: 'red' } } }}
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
						onVisualizarTask={(row) => {
							sysLayoutContext.showModal({
								onClose: () => {
									setOpen((open) => !open);
									sysLayoutContext.closeModal();
								},
								open: open,
								body: (
									<TaskView
										onCheckTask={controller.onCheckTask}
										task={row}
										onEdit={(row) => {
											navigate('/tasks/edit/' + row._id);
											sysLayoutContext.closeModal();
										}}
									/>
								)
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
						onVisualizarTask={(row) => {
							sysLayoutContext.showModal({
								onClose: () => {
									setOpen((open) => !open);
									sysLayoutContext.closeModal();
								},
								open: open,
								body: (
									<TaskView
										onCheckTask={controller.onCheckTask}
										task={row}
										onEdit={(row) => {
											navigate('/tasks/edit/' + row._id);
											sysLayoutContext.closeModal();
										}}
									/>
								)
							});
						}}
						onCheckTask={controller.onCheckTask}
					/>
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
export function TaskListView() {
	return (
		<TaskListController>
			<App />
		</TaskListController>
	);
}
