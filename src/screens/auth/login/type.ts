import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export interface LoginFormProps {
	password: string;
	email: string;
}

export interface LoginFormComponentProps {
	loginHandler: (values: LoginFormProps) => void;
	loadingStatus: string;
	errorMessage: string | null;
	t: any;
	handleNavigation: (screen: 'Signup' | 'ForgotPassword') => void;
}
export type Style = {
	container: ViewStyle;
	loginText: TextStyle;
	textInputContainer: ViewStyle;
	formContainer: ViewStyle;
	forgotPasswordText: TextStyle;
	logo: ImageStyle;
};
