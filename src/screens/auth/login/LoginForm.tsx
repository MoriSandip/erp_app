import { Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';

import { LoginFormComponentProps, LoginFormProps } from './type';
import { styles } from './styles';
import { loginSchema } from '../../../utils/validation/loginvalidation';
import FormInputWrapper from '../../../components/FormInputWrapper';
import ErrorMessage from '../../../components/ErrorMessage';
import Button from '../../../components/Button';

const LoginForm = ({
	loginHandler,
	loadingStatus,
	errorMessage,
	t,
	handleNavigation,
}: LoginFormComponentProps) => {
	const initialValues: LoginFormProps = { email: '', password: '' };

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={loginHandler}
			validationSchema={loginSchema(t)}
		>
			{props => (
				<View style={styles.formContainer}>
					<FormInputWrapper<LoginFormProps>
						fields={[
							{ name: 'email' },
							{ name: 'password', secureTextEntry: true },
						]}
					/>
					{errorMessage && <ErrorMessage error={errorMessage} />}

					<TouchableOpacity onPress={() => handleNavigation('ForgotPassword')}>
						<Text style={styles.forgotPasswordText}>
							{t('LOGIN.FORGOT_PASSWORD')}
						</Text>
					</TouchableOpacity>

					<Button
						label={t('LOGIN.LOGIN_BTN')}
						disabled={!props.isValid}
						onPress={() => props.handleSubmit()}
						isLoading={loadingStatus === 'loading'}
					/>
				</View>
			)}
		</Formik>
	);
};

export default LoginForm;
