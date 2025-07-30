import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type Style = {
	container: ViewStyle;
	icon: ImageStyle;
	extraSpace: ViewStyle;
	title: TextStyle;
	rightIcon: ImageStyle;
};

export interface BackArrowWithTitleProps {
	title: string;
	handleGoBack: () => void;
	isRightIconAvailable?: boolean;
	handleRightIconPress?: () => void;
	rightIcon?: string;
}
