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
		backgroundColor: AppTheme.colors.white,
	},
	forgotText: {
		fontWeight: 700,
		fontSize: 26,
		lineHeight: 36.97,
		color: AppTheme.colors.black,
		fontFamily: fontFamily.regular,
	},
	text: {
		fontWeight: 500,
		fontSize: 14,
		color: AppTheme.colors.textColor,
		marginTop: 10,
		lineHeight: 19.91,
		fontFamily: fontFamily.regular,
	},
	textInputContainer: {
		width: '100%',
		marginBottom: 30,
	},
	formContainer: {
		marginTop: 20,
		width: '100%',
	},
	forgotPasswordText: {
		marginTop: 10,
		marginBottom: 25,
		alignSelf: 'flex-end',
		fontWeight: 600,
		textDecorationLine: 'underline',
		fontSize: 14,
		lineHeight: 20,
		color: AppTheme.colors.black,
	},
	logo: {
		height: 100,
		marginBottom: 24,
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
});
