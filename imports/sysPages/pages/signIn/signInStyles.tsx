import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { sysSizing } from '../../../ui/materialui/styles';
import sysLightPalette from '/imports/ui/materialui/sysColors';

interface ISignInStyles {
	Container: React.ElementType;
	Content: React.ElementType;
	FormContainer: React.ElementType;
	FormWrapper: React.ElementType;
}

const SignInStyles: ISignInStyles = {
	Container: styled(Box)(({ theme }) => ({
		width: '100%',
		height: '100vh',
		backgroundColor: sysLightPalette.primary?.main,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	})),
	Content: styled(Box)(({ theme }) => ({
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	})),
	FormContainer: styled(Paper)(({ theme }) => ({
		gap: theme.spacing(4),

		padding: `${sysSizing.spacingFixedLg} ${sysSizing.spacingFixedXl}`,
		background: 'linear-gradient(260deg,#00FFC9 0%, #04C4E8 49%,#069EFC 95%)',
		boxShadow: '10px 8px 20px 5px rgba(0, 0, 0, 0.25)',
		borderRadius: '28px',
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	})),
	FormWrapper: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: theme.spacing(2),
		color: 'white'
	}))
};

export default SignInStyles;
