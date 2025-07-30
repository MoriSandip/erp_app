import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export interface ForgotFormProps {
	email: string;
}

export type Style = {
	container: ViewStyle;
	forgotText: TextStyle;
	textInputContainer: ViewStyle;
	formContainer: ViewStyle;
	forgotPasswordText: TextStyle;
	logo: ImageStyle;
	blankSpace: ViewStyle;
	text: TextStyle;
	icon: ImageStyle;
	backArrow: ImageStyle;
};
