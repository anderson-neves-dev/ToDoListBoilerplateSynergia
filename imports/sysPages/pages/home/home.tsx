import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import HomeSectionNotificacoes from './sections/notificacoes';
import HomeSectionDialogs from './sections/dialogs';
import HomeStyles from './homeStyle';
import HomeSectionComponents from '/imports/sysPages/pages/home/sections/componentTests';
import AuthContext from '/imports/app/authProvider/authContext';
import TaskListController, {
	TaskListControllerContext
} from '/imports/modules/toDos/pages/taskList/taskListController';
import { ListTaskView } from '/imports/modules/toDos/components/listTask/listTaskView';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { TaskView } from '/imports/modules/toDos/components/takView/TaskView';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const App: React.FC = () => {
	const { Container, Header, LoadingContainer, ContainerBody } = HomeStyles;
	const { user } = useContext(AuthContext);
	const controller = useContext(TaskListControllerContext);
	const [open, setOpen] = useState(false);
	const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
	const navigate = useNavigate();
	console.log(controller.tasksRecent);
	return (
		<Container>
			{controller.loading ? (
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			) : (
				<ContainerBody>
					<Header>
						<Typography variant="h1">Olá, {user?.username}</Typography>
						<Typography variant="body1" textAlign={'justify'}>
							Seus projetos muito mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!
						</Typography>
					</Header>
					<ListTaskView
						taskList={controller.tasksRecent}
						title="Adicionadas recentemente"
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
						pageHome
					/>
					<SysFab
						variant="extended"
						text="Ir para Tarefas"
						endIcon={<KeyboardDoubleArrowRightIcon />}
						fixed={true}
						onClick={() => navigate('/tasks/')}
					/>
				</ContainerBody>
			)}
		</Container>
	);
};

export default function Home() {
	return (
		<TaskListController>
			<App />
		</TaskListController>
	);
}
