import { StyleSheet } from 'react-native';

import { Style } from './type';
import AppTheme from '../../../styles/theme';
import { fontFamily } from '../../../styles/fonts';
import { getDeviceHeight } from '../../../utils/helpers';

export const styles = StyleSheet.create<Style>({
	container: {
		height: getDeviceHeight(),
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		padding: 30,
		backgroundColor: AppTheme.colors.Secondary,
	},
	loginText: {
		fontWeight: '700',
		fontSize: 26,
		lineHeight: 36.97,
		color: AppTheme.colors.black,
		fontFamily: fontFamily.regular,
	},
	textInputContainer: {
		width: '100%',
	},
	formContainer: {
		marginTop: 15,
	},
	forgotPasswordText: {
		marginTop: 10,
		marginBottom: 25,
		alignSelf: 'flex-end',
		fontWeight: '600',
		textDecorationLine: 'underline',
		lineHeight: 20,
		color: AppTheme.colors.black,
		fontFamily: fontFamily.regular,
	},
	logo: {
		height: 100,
		marginBottom: 30,
	},
});
