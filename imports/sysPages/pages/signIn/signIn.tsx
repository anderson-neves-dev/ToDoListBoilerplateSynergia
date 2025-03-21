import React, { useContext, useEffect } from 'react';
import SignInStyles from './signInStyles';
import { useNavigate } from 'react-router-dom';
import SysTextField from '../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysForm from '../../../ui/components/sysForm/sysForm';
import SysFormButton from '../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import { signInSchema } from './signinsch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

const SignInPage: React.FC = () => {
	const { showNotification } = useContext(AppLayoutContext);
	const { user, signIn } = useContext<IAuthContext>(AuthContext);
	const navigate = useNavigate();
	const { Container, Content, FormContainer, FormWrapper } = SignInStyles;

	const handleSubmit = ({ email, password }: { email: string; password: string }) => {
		signIn(email, password, (err) => {
			if (!err) navigate('/');
			showNotification({
				type: 'error',
				title: 'Erro ao tentar logar',
				message: 'Email ou senha inválidos'
			});
		});
	};

	const handleForgotPassword = () => navigate('/password-recovery');

	useEffect(() => {
		if (user) navigate('/');
	}, [user]);

	return (
		<Container>
			<Content>
				<FormContainer>
					<Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
					<Typography variant="h3" sx={{ color: 'white' }}>
						Realize o login
					</Typography>
					<SysForm schema={signInSchema} onSubmit={handleSubmit} debugAlerts={false}>
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
							<SysTextField label="Senha" fullWidth name="password" placeholder="Digite sua senha" type="password" />
							<Box />
							<SysFormButton
								sx={{ width: '100%' }}
								variant="contained"
								color="primary"
								endIcon={<SysIcon name={'arrowForward'} />}>
								Entrar
							</SysFormButton>
							<Button variant="text" onClick={handleForgotPassword}>
								<Typography sx={{ display: 'flex', flexDirection: 'row', color: 'white' }}>
									Novo por aqui? <Typography variant="link">Cadastre-se</Typography>
								</Typography>
							</Button>
						</FormWrapper>
					</SysForm>
				</FormContainer>
			</Content>
		</Container>
	);
};

export default SignInPage;
