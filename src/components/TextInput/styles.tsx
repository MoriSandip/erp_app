import { StyleSheet } from 'react-native';

import { Style } from './type';
import AppTheme from '../../styles/theme';

export const styles = StyleSheet.create<Style>({
	textInput: {
		height: 48,
		width: '100%',
		borderWidth: 1,
		padding: 10,
		color: AppTheme.colors.black,
		borderRadius: 5,
		borderColor: AppTheme.colors.borderColor,
		backgroundColor: AppTheme.colors.white,
	},
	error: {
		color: AppTheme.colors.red,
		marginTop: 10,
		fontSize: 14,
		fontWeight: '500',
		lineHeight: 19.91,
	},
	label: {
		marginVertical: 2,
		fontWeight: 600,
		fontSize: 16,
		lineHeight: 22.75,
		color: AppTheme.colors.textColor,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: AppTheme.colors.borderColor,
	},
	eyeIconContainer: {
		position: 'absolute',
		right: 4,
		padding: 10,
	},
	icon: {
		height: 24,
		width: 24,
	},
	invalid: {
		borderColor: AppTheme.colors.red,
		backgroundColor: AppTheme.colors.errorBackgroundColor,
	},
	isValid: {
		borderColor: AppTheme.colors.buttonColor,
		backgroundColor: AppTheme.colors.selectedColor,
	},
});
