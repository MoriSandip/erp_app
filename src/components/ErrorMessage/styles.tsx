import { StyleSheet } from 'react-native';

import { Style } from './type';
import AppTheme from '../../styles/theme';

export const styles = StyleSheet.create<Style>({
	error: {
		color: AppTheme.colors.red,
		marginTop: 5,
	},
});
