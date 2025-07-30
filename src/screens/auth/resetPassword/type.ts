import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export interface ResetPasswordFormProps {
	password: string;
	passwordConfirm: string;
}

export type Style = {
	container: ViewStyle;
	resetText: TextStyle;
	textInputContainer: ViewStyle;
	formContainer: ViewStyle;
	logo: ImageStyle;
	blankSpace: ViewStyle;
	text: TextStyle;
	icon: ImageStyle;
	backArrow: ImageStyle;
	buttonSave: ViewStyle;
};
