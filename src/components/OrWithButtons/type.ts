import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type Style = {
	container: ViewStyle;
	line: ViewStyle;
	buttonContainer: ViewStyle;
	button: ViewStyle;
	bottomContainer: ViewStyle;
	iconTextContainer: ViewStyle;
	icon: ImageStyle;
	orLoginText: TextStyle;
	inlLineL: ViewStyle;
	inlLineR: ViewStyle;
	label: TextStyle;
	needToFindYaFeetText: TextStyle;
	signUpText: TextStyle;
	loginText: TextStyle;
	widthLogin: ViewStyle;
	widthDefault: ViewStyle;
	cardContainer: ViewStyle;
};

export type OrWithButtonsProps = {
	tapHandler: () => void;
	isFromLogin: boolean;
};
