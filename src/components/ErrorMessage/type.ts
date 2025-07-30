import { TextStyle } from 'react-native';

export interface ErrorParamList {
	error: string;
	style?: object;
}

export type Style = {
	error: TextStyle;
};
