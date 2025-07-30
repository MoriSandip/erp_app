import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export interface SignUpFormProps {
	fullName: string;
	password: string;
	email: string;
	confirmPassword: string;
	isTermAccepted: boolean;
}

export type Style = {
	container: ViewStyle;
	startedText: TextStyle;
	textInputContainer: ViewStyle;
	formContainer: ViewStyle;
	iAggreeText: TextStyle;
	logo: ImageStyle;
	blankSpace: ViewStyle;
	iAggreeContainer: ViewStyle;
	iAggreeBox: ViewStyle;
	termsConditionText: TextStyle;
	icon: ImageStyle;
	button: ViewStyle;
};
