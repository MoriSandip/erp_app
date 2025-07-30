import {
	TextInputProps,
	TextStyle,
	TextInput,
	ViewStyle,
	ImageStyle,
} from 'react-native';

export interface RefObject<T> {
	readonly current: T | null;
}

export interface TextInputParamList extends TextInputProps {
	style?: object;
	isInvalid?: boolean;
	errorMessage?: string;
	onRef?: RefObject<TextInput>;
	label: string;
}

export type Style = {
	textInput: TextStyle;
	error: TextStyle;
	label: TextStyle;
	inputContainer: ViewStyle;
	eyeIconContainer: ViewStyle;
	icon: ImageStyle;
	invalid: ViewStyle;
	isValid: ViewStyle;
};
