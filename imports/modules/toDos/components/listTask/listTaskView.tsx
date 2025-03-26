import { Button, Checkbox, List, ListItem, ListItemText, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useContext, useState } from 'react';
import { ITask } from '../../api/taskSch';
import ListTaskStyles from './listTaskStyles';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { sysSizing } from '/imports/ui/materialui/styles';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import AuthContext from '/imports/app/authProvider/authContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface Props {
	taskList: ITask[];
	title: string;
	onDeleteClick: (row: any) => void;
	onEdit: (row: any) => void;
	onCheckTask: (doc: ITask) => void;
	onVisualizarTask?: (doc: ITask) => void;
	pageHome?: boolean;
}

const { Title, ListStyled, Container, IconsDiv, ListStyledFirst } = ListTaskStyles;
export function ListTaskView({
	taskList,
	title,
	onDeleteClick,
	onEdit,
	onCheckTask,
	onVisualizarTask,
	pageHome
}: Props) {
	const [isOpen, setIsOpen] = useState(true);
	const { user } = useContext(AuthContext);

	return (
		<Box>
			{!pageHome && (
				<Title onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? <KeyboardArrowDownIcon fontSize="medium" /> : <KeyboardArrowRightIcon fontSize="medium" />}
					<Typography variant="h5">{`${title} (${taskList.length})`}</Typography>
				</Title>
			)}
			{(pageHome || isOpen) && (
				<Container sx={pageHome ? { overflow: 'hidden', height: '50vh' } : {}}>
					<List sx={{ paddingLeft: '10px' }}>
						{!pageHome &&
							taskList.map((task: ITask, index: number) => (
								<ListStyled>
									<ListItem key={index} sx={{ padding: '0px' }}>
										<Checkbox
											checked={task.check}
											onChange={(event) => onCheckTask({ ...task, check: event.target.checked })}
										/>
										<ListItemText
											primary={task.title}
											secondary={task.createdby == user?._id ? 'Você' : task.username}
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
						{pageHome &&
							taskList.map((task: ITask, index: number) =>
								index == 0 ? (
									<ListStyledFirst>
										<Typography sx={{ width: '40%', textAlign: 'left' }} variant="h5">{`${title}`}</Typography>

										<ListStyled sx={{ borderTop: `1px solid black`, height: '8vh' }}>
											<ListItem key={index} sx={{ padding: '0px' }}>
												<Checkbox
													checked={task.check}
													onChange={(event) => onCheckTask({ ...task, check: event.target.checked })}
												/>
												<ListItemText
													primary={task.title}
													secondary={task.createdby == user?._id ? 'Você' : task.username}
													primaryTypographyProps={{ sx: { textDecoration: task.check ? 'line-through' : 'none' } }}
													onClick={onVisualizarTask ? () => onVisualizarTask(task) : () => {}}
												/>
												<IconsDiv>
													<SysIcon name={'edit'} onClick={() => onEdit(task)} />
													<SysIcon name={'delete'} onClick={() => onDeleteClick(task)} />
												</IconsDiv>
											</ListItem>
										</ListStyled>
									</ListStyledFirst>
								) : (
									<ListStyled>
										<ListItem key={index} sx={{ padding: '0px' }}>
											<Checkbox
												checked={task.check}
												onChange={(event) => onCheckTask({ ...task, check: event.target.checked })}
											/>
											<ListItemText
												primary={task.title}
												secondary={task.createdby == user?._id ? 'Você' : task.username}
												primaryTypographyProps={{ sx: { textDecoration: task.check ? 'line-through' : 'none' } }}
												onClick={onVisualizarTask ? () => onVisualizarTask(task) : () => {}}
											/>
											<IconsDiv>
												<SysIcon name={'edit'} onClick={() => onEdit(task)} />
												<SysIcon name={'delete'} onClick={() => onDeleteClick(task)} />
											</IconsDiv>
										</ListItem>
									</ListStyled>
								)
							)}
					</List>
				</Container>
			)}
		</Box>
	);
}
