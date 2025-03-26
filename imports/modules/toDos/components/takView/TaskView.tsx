import { Button, Checkbox, List, ListItem, ListItemText, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useContext, useState } from 'react';
import { ITask } from '../../api/taskSch';
import TaskStyles from './TaskStyles';
import AuthContext from '/imports/app/authProvider/authContext';

interface Props {
	task: ITask;
	onCheckTask: (doc: ITask) => void;
	onEdit: (row: any) => void;
}

const { Header, Body, Container, SectionText, Footer } = TaskStyles;

export function TaskView({ task, onCheckTask, onEdit }: Props) {
	const { user } = useContext(AuthContext);

	return (
		<Container>
			<Header>
				<Checkbox checked={task.check} onChange={(event) => onCheckTask({ ...task, check: event.target.checked })} />
				<Typography variant="h3">{task.title}</Typography>
			</Header>
			<Body>
				<SectionText>
					<Typography variant="body2">Descrição: </Typography>
					<Typography variant="body1">{task.description}</Typography>
				</SectionText>
				<SectionText>
					<Typography variant="body2">Tipo: </Typography>
					<Typography variant="body1">{task.type}</Typography>
				</SectionText>
				<Button onClick={() => onEdit(task)}>Editar Tarefa</Button>
			</Body>
			<Footer>
				<Typography variant="body2">Criada por: {task.createdby == user?._id ? 'Você' : task.username}</Typography>
			</Footer>
		</Container>
	);
}
