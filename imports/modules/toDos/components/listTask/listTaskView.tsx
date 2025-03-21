import { Button, Checkbox, List, ListItem, ListItemText, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { ITask } from '../../api/taskSch';
import ListTaskStyles from './listTaskStyles';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { sysSizing } from '/imports/ui/materialui/styles';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';

interface Props {
	taskList: ITask[];
	title: string;
	onDeleteClick: (row: any) => void;
	onEdit: (row: any) => void;
	onCheckTask: (doc: ITask) => void;
	onVisualizarTask?: (doc: ITask) => void;
}

const { Title, ListStyled, Container, IconsDiv } = ListTaskStyles;
export function ListTaskView({ taskList, title, onDeleteClick, onEdit, onCheckTask, onVisualizarTask }: Props) {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<Box>
			<Title onClick={() => setIsOpen(!isOpen)}>
				<SysIcon sx={{ fontSize: sysSizing.componentsIconSize }} name={isOpen ? 'menuOpen' : 'menu'} />
				<Typography variant="h5">{`${title} (${taskList.length})`}</Typography>
			</Title>
			{isOpen && (
				<Container>
					<List>
						{taskList.map((task: ITask, index: number) => (
							<ListStyled>
								<ListItem key={index} sx={{ padding: '0px' }}>
									<Checkbox
										checked={task.check}
										onChange={(event) => onCheckTask({ ...task, check: event.target.checked })}
									/>
									<ListItemText
										primary={task.title}
										secondary={`${task.check}`}
										primaryTypographyProps={{ sx: { textDecoration: task.check ? 'line-through' : 'none' } }}
										onClick={onVisualizarTask ? () => onVisualizarTask(task) : () => {}}
									/>
									<IconsDiv>
										<SysIcon name={'edit'} onClick={() => onEdit(task)} />
										<SysIcon name={'delete'} onClick={() => onDeleteClick(task)} />
									</IconsDiv>
								</ListItem>
							</ListStyled>
						))}
					</List>
				</Container>
			)}
		</Box>
	);
}
