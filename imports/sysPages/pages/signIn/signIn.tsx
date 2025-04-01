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
import sysLightPalette from '/imports/ui/materialui/sysColors';
import { LogoSynergia } from '/imports/ui/logoSynergia';

const SignInPage: React.FC = () => {
	const { showNotification } = useContext(AppLayoutContext);
	const { user, signIn } = useContext<IAuthContext>(AuthContext);
	const navigate = useNavigate();
	const { Container, Content, FormContainer, FormWrapper, Header } = SignInStyles;

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

	const handleSingUp = () => navigate('/signup');

	useEffect(() => {
		if (user) navigate('/');
	}, [user]);

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
							<Button variant="text" onClick={handleSingUp}>
								<Typography sx={{ display: 'flex', gap: '5px', flexDirection: 'row', color: 'white' }}>
									Novo por aqui?{' '}
									<Typography color="primary" variant="link">
										Cadastre-se
									</Typography>
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
