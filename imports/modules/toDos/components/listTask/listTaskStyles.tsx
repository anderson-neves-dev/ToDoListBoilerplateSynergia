import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '/imports/ui/materialui/styles';
import sysLightPalette from '/imports/ui/materialui/sysColors';

interface IListTaskStyles {
	Title: ElementType<BoxProps>;
	ListStyled: ElementType<BoxProps>;
	ListStyledFirst: ElementType<BoxProps>;
	TitleHome: ElementType<BoxProps>;
	Container: ElementType<BoxProps>;
	IconsDiv: ElementType<BoxProps>;
	IconWrapper: ElementType<BoxProps>;
}

const ListTaskStyles: IListTaskStyles = {
	Container: styled(Box)(() => ({
		width: '100%',
		height: '32vh',
		overflow: 'auto',
		padding: `0px ${sysSizing.spacingFixedMd} ${sysSizing.spacingFixedSm} ${sysSizing.spacingFixedMd}`
	})),
	Title: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		gap: sysSizing.spacingFixedMd,
		padding: `${sysSizing.spacingFixedSm} ${sysSizing.spacingFixedMd}`
	})),
	TitleHome: styled(Box)(({ theme }) => ({
		width: '40%',
		textAlign: 'left',
		[theme.breakpoints.down('md')]: {
			width: '100%'
		}
	})),
	ListStyled: styled(Box)(({ theme }) => ({
		width: '100%',
		borderBottom: `1px solid ${sysLightPalette.text?.secondary}`,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	})),
	ListStyledFirst: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		textAlign: 'center',
		marginBottom: '5vh',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			height: 'auto',
			alignItems: 'flex-start', // Alinha os itens à esquerda
			justifyContent: 'flex-start', // Mantém alinhamento na vertical
			marginBottom: '0vh',
			gap: sysSizing.spacingFixedMd
		}
	})),
	IconsDiv: styled(Box)(({ theme }) => ({
		display: 'flex',
		gap: sysSizing.spacingRemSm
	})),
	IconWrapper: styled(Box)(({ theme }) => ({
		color: '#00ff99',
		display: 'flex',
		alignItems: 'center',
		marginRight: sysSizing.spacingFixedMd,
		marginLeft: sysSizing.spacingFixedMd
	}))
};

export default ListTaskStyles;
