import { StyleSheet } from 'react-native';
 
import { Style } from './type';
import AppTheme from '../../styles/theme';
import { fontFamily } from '../../styles/fonts';

export const styles = StyleSheet.create<Style>({
	container: {
		// backgroundColor: AppTheme.colors.buttonColor,
		// width: '100%',
		height: 56,
		// gap: 4,
		justifyContent: 'center',
	},
	labelText: {
		fontWeight: 700,
		fontSize: 20,
		lineHeight: 28.44,
		color: AppTheme.colors.white,
		textAlign: 'center',
		fontFamily: fontFamily.regular,
	},
	disabled: {
		backgroundColor: AppTheme.colors.disabled,
	},
	activityIndicator: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
