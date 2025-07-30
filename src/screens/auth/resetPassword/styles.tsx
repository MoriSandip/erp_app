import { Dimensions, StyleSheet } from 'react-native';

import { Style } from './type';
import AppTheme from '../../../styles/theme';
import { fontFamily } from '../../../styles/fonts';

export const styles = StyleSheet.create<Style>({
	container: {
		height: Dimensions.get('screen').height,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		padding: 29,
		backgroundColor: AppTheme.colors.Secondary,
	},
	resetText: {
		fontWeight: 700,
		fontSize: 26,
		lineHeight: 36.97,
		color: AppTheme.colors.black,
		fontFamily: fontFamily.regular,
	},
	text: {
		fontWeight: 400,
		fontSize: 14,
		lineHeight: 12,
		color: AppTheme.colors.textColor,
		marginTop: 15,
		backgroundColor: AppTheme.colors.white,
		fontFamily: fontFamily.regular,
	},
	textInputContainer: {
		width: '100%',
	},
	formContainer: {
		marginTop: 20,
		width: '100%',
	},
	logo: {
		height: 100,
		marginBottom: 30,
	},
	blankSpace: {
		height: '34%',
	},
	icon: {
		height: 24,
		width: 24,
	},
	backArrow: {
		position: 'absolute',
		top: 54,
		left: 24,
	},
	buttonSave: {
		marginTop: 30,
	},
});
