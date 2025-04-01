import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '/imports/ui/materialui/styles';
import sysLightPalette from '/imports/ui/materialui/sysColors';

interface ITaskViewStyles {
	Header: ElementType<BoxProps>;
	Body: ElementType<BoxProps>;
	Descricao: ElementType<BoxProps>;
	SectionText: ElementType<BoxProps>;
	Footer: ElementType<BoxProps>;
	Container: ElementType<BoxProps>;
	ContainerBody: ElementType<BoxProps>;
	FooterCreateBy: ElementType<BoxProps>;
}

const TaskStyles: ITaskViewStyles = {
	Container: styled(Box)(({ theme }) => ({
		width: '80vh',
		height: 'auto',
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		gap: sysSizing.spacingFixedLg,
		[theme.breakpoints.down('md')]: {
			minHeight: '50vh',
			height: 'auto',
			maxHeight: '80vh',
			width: '100%'
		}
	})),
	ContainerBody: styled(Box)(({ theme }) => ({
		width: '100%',
		minWidth: '30vh',
		gap: sysSizing.contentPt,
		overflow: 'hidden',
		padding: `${sysSizing.contentPt} ${sysSizing.contentPb} ${sysSizing.contentPb} ${sysSizing.contentPb}`,
		[theme.breakpoints.down('md')]: {
			padding: `${sysSizing.spacingFixedLg} ${sysSizing.contentPt} ${sysSizing.contentPt} ${sysSizing.contentPt}`,
			height: '80vh',
			width: '100%'
		}
	})),

	Header: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'row',
		justifyItems: 'center',
		width: '100%',
		marginTop: `-${sysSizing.spacingFixedLg}`,
		marginBottom: sysSizing.spacingFixedLg,
		gap: sysSizing.spacingFixedMd
	})),
	Body: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingRemLg
	})),

	SectionText: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedSm,
		width: '90%',
		paddingLeft: sysSizing.spacingFixedMd,

		borderLeft: `1px solid ${sysLightPalette.divider}`
	})),
	Descricao: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'column',
		maxHeight: '150px',
		overflowY: 'auto',
		overflowX: 'hidden',
		gap: sysSizing.spacingFixedSm,
		width: '90%',
		paddingLeft: sysSizing.spacingFixedMd,

		borderLeft: `1px solid ${sysLightPalette.divider}`
	})),
	Footer: styled(Box)(() => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedLg,
		marginTop: '20px',
		padding: `0 ${sysSizing.contentPt} ${sysSizing.contentPt} ${sysSizing.contentPt}`
	})),
	FooterCreateBy: styled(Box)(() => ({
		width: '100%',
		justifyItems: 'flex-end',
		marginRight: sysSizing.spacingFixedMd,
		marginBottom: '50px'
	}))
};

export default TaskStyles;
