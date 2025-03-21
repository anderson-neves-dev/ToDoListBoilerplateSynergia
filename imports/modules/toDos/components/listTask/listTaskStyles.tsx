import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '/imports/ui/materialui/styles';
import { SysSectionPaddingXY } from '/imports/ui/layoutComponents/sysLayoutComponents';
import { Padding } from '@mui/icons-material';
import sysLightPalette from '/imports/ui/materialui/sysColors';

interface IListTaskStyles {
	Title: ElementType<BoxProps>;
	ListStyled: ElementType<BoxProps>;
	Container: ElementType<BoxProps>;
	IconsDiv: ElementType<BoxProps>;
}

const ListTaskStyles: IListTaskStyles = {
	Container: styled(SysSectionPaddingXY)(() => ({
		width: '100%',
		height: '32vh',
		overflow: 'auto',
		padding: `0px ${sysSizing.spacingFixedMd} ${sysSizing.spacingFixedSm} ${sysSizing.spacingFixedMd}`,
		borderTop: `1px solid ${sysLightPalette.text?.secondary}`
	})),
	Title: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		// height: '100vh',
		gap: sysSizing.spacingFixedMd,
		padding: `${sysSizing.spacingFixedSm} ${sysSizing.spacingFixedMd}`
	})),
	ListStyled: styled(Box)(({ theme }) => ({
		width: '100%',
		borderBottom: `1px solid ${sysLightPalette.text?.secondary}`
	})),
	IconsDiv: styled(Box)(({ theme }) => ({
		display: 'flex',
		gap: sysSizing.spacingRemSm
	}))
};

export default ListTaskStyles;
