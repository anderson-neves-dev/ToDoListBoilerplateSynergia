import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '/imports/ui/materialui/styles';
import { SysSectionPaddingXY } from '/imports/ui/layoutComponents/sysLayoutComponents';
import { Height, Padding } from '@mui/icons-material';
import sysLightPalette from '/imports/ui/materialui/sysColors';

interface ITaskViewStyles {
	Header: ElementType<BoxProps>;
	Body: ElementType<BoxProps>;

	SectionText: ElementType<BoxProps>;
	Footer: ElementType<BoxProps>;
	Container: ElementType<BoxProps>;
}

const TaskStyles: ITaskViewStyles = {
	Container: styled(SysSectionPaddingXY)(() => ({
		width: '80vh',

		padding: `0px ${sysSizing.spacingFixedMd} ${sysSizing.spacingFixedSm} ${sysSizing.spacingFixedMd}`
		// borderTop: `1px solid ${sysLightPalette.text?.secondary}`
	})),
	Header: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'row',
		justifyItems: 'center',
		width: '100%',
		// height: '100vh',
		gap: sysSizing.spacingFixedMd,
		padding: `${sysSizing.spacingFixedSm} ${sysSizing.spacingFixedMd}`
	})),
	Body: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingRemLg
	})),
	SectionText: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedSm,
		width: '90%'
	})),
	Footer: styled(Box)(() => ({
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		marginRight: sysSizing.spacingFixedMd
	}))
};

export default TaskStyles;
