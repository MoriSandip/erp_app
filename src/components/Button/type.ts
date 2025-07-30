import { TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';

export interface ButtonParamList extends TouchableOpacityProps {
	buttonStyle?: object;
	labelTextStyle?: object;
	label: string;
	disabled?: boolean;
	isLoading?: boolean;
	type?: string;
}

export type Style = {
	container: ViewStyle;
	labelText: TextStyle;
	disabled: ViewStyle;
	activityIndicator: ViewStyle;
};
