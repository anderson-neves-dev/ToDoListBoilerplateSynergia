// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import { userprofileApi } from '../../../modules/userprofile/api/userProfileApi';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';

import SignUpStyles, { signUpStyle } from './signUpStyle';
import Box from '@mui/material/Box';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import { signUpSchema } from './singUpSch';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { Typography } from '@mui/material';
import { LogoSynergia } from '/imports/ui/logoSynergia';
import sysLightPalette from '/imports/ui/materialui/sysColors';

interface ISignUp {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

export const SignUp = (props: ISignUp) => {
	const { showNotification } = props;
	const { Container, Content, FormContainer, FormWrapper, Header } = SignUpStyles;

	const nav = useNavigate();
	const handleSubmit = (doc: { email: string; username: string; password: string }) => {
		const { email, password, username } = doc;

		userprofileApi.insertNewUser({ email, username, password }, (err, r) => {
			if (err) {
				console.log('Login err', err);
				showNotification &&
					showNotification({
						type: 'warning',
						title: 'Problema na criação do usuário!',
						description: 'Erro ao fazer registro em nossa base de dados!'
					});
			} else {
				showNotification &&
					showNotification({
						type: 'sucess',
						title: 'Cadastrado com sucesso!',
						description: 'Registro de usuário realizado em nossa base de dados!'
					});
				nav('/');
			}
		});
	};

	return (
		<Container>
			<Content>
				<FormContainer>
					<Header>
						<LogoSynergia />
						<Typography variant="h3" sx={{ color: sysLightPalette.sysAction?.primary }}>
							Realize o login
						</Typography>
					</Header>
					<SysForm schema={signUpSchema} onSubmit={handleSubmit} debugAlerts={false}>
						<FormWrapper>
							<SysTextField
								sx={{
									'& label': { color: 'white' }
								}}
								name="email"
								label="Email"
								fullWidth
								placeholder="Digite seu email"
							/>
							<SysTextField
								sx={{
									'& label': { color: 'white' }
								}}
								name="username"
								label="Username"
								fullWidth
								placeholder="Digite seu username"
							/>
							<SysTextField label="Senha" fullWidth name="password" placeholder="Digite sua senha" type="password" />
							<Box />
							<SysFormButton
								sx={{ width: '100%' }}
								variant="contained"
								color="primary"
								endIcon={<SysIcon name={'arrowForward'} />}>
								Cadastrar
							</SysFormButton>
							<Button sx={{ width: '100%' }} variant="outlined" color="primary" onClick={() => nav('/')}>
								Cancelar
							</Button>
						</FormWrapper>
					</SysForm>
				</FormContainer>
			</Content>
		</Container>
	);
};
