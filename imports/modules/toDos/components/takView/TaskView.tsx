import { Button, Checkbox, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ITask } from '../../api/taskSch';
import TaskStyles from './TaskStyles';
import AuthContext from '/imports/app/authProvider/authContext';
import { sysSizing } from '/imports/ui/materialui/styles';
import sysLightPalette from '/imports/ui/materialui/sysColors';

interface Props {
	task: ITask;
	onCheckTask: (doc: ITask) => void;
	onEdit: (row: any) => void;
}

const { Header, Body, Container, SectionText, Footer, Descricao, ContainerBody, FooterCreateBy } = TaskStyles;

export function TaskView({ task, onCheckTask, onEdit }: Props) {
	const { user } = useContext(AuthContext);
	console.log({ task });
	return (
		<Container>
			<ContainerBody>
				<Header>
					<Checkbox
						sx={{ marginLeft: '-12px' }}
						checked={task.check}
						onChange={(event) => onCheckTask({ ...task, check: event.target.checked })}
					/>
					<Typography variant="h3">{task.title}</Typography>
				</Header>
				<Body>
					<Typography
						sx={{ paddingLeft: sysSizing.spacingFixedMd, borderLeft: `1px solid ${sysLightPalette.divider}` }}
						variant="body2">
						Descrição:{' '}
					</Typography>
					<Descricao>
						<Typography variant="body1">{task.description}</Typography>
					</Descricao>
					<SectionText>
						<Typography variant="body2">Tipo: </Typography>
						<Typography variant="body1">{task.type != 'private' ? 'Para o Time' : 'Pessoal'}</Typography>
					</SectionText>
					<SectionText>
						<Typography variant="body2">Data de criação: </Typography>
						<Typography variant="body1">
							{task.createdat
								? new Intl.DateTimeFormat('pt-BR', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
										hour12: false
									}).format(new Date(task.createdat))
								: 'Data inválida'}
						</Typography>
					</SectionText>
				</Body>
			</ContainerBody>
			<Footer>
				<Button onClick={() => onEdit(task)}>Editar Tarefa</Button>
				<FooterCreateBy>
					<Typography variant="body2">Criada por: {task.createdby == user?._id ? 'Você' : task.username}</Typography>
				</FooterCreateBy>
			</Footer>
		</Container>
	);
}
