import { StyleSheet } from 'react-native';
 
import { Style } from './type';
import AppTheme from '../../styles/theme';
import { fontFamily } from '../../styles/fonts';

export const styles = StyleSheet.create<Style>({
	line: {
		width: '32%',
	},
	inlLineL: {
		width: '80%',
		backgroundColor: AppTheme.colors.platformColor,
		height: 1,
		alignSelf: 'flex-start',
	},
	inlLineR: {
		width: '80%',
		backgroundColor: AppTheme.colors.platformColor,
		height: 1,
		alignSelf: 'flex-end',
	},
	container: {
		width: '100%',
		marginVertical: 25,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		alignItems: 'center',
	},
	button: {
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		width: '48%',
		height: 50,
		borderRadius: 5,
		borderColor: ' black',
		borderWidth: 1,
		gap: 10,
	},
	bottomContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 25,
		gap: 8,
	},
	iconTextContainer: {
		gap: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: 35,
		height: 35,
	},
	orLoginText: {
		width: '33%',
		textAlign: 'center',
		fontWeight: 600,
		fontSize: 16,
		lineHeight: 22.75,
		color: AppTheme.colors.textColor,
		fontFamily: fontFamily.regular,
	},
	label: {
		fontWeight: 700,
		fontSize: 18,
		lineHeight: 25.6,
		color: AppTheme.colors.textColor,
		fontFamily: fontFamily.regular,
	},
	needToFindYaFeetText: {
		fontWeight: 600,
		fontSize: 14,
		lineHeight: 24,
		color: AppTheme.colors.black,
		fontFamily: fontFamily.regular,
	},
	signUpText: {
		fontWeight: 700,
		fontSize: 16,
		lineHeight: 20,
		color: AppTheme.colors.black,
		textDecorationLine: 'underline',
		fontFamily: fontFamily.regular,
	},
	widthLogin: {
		width: '33%',
	},
	widthDefault: {
		width: '38%',
	},
	loginText: {
		fontWeight: 700,
		fontSize: 16,
		lineHeight: 20,
		color: AppTheme.colors.black,
		fontFamily: fontFamily.regular,
	},
	cardContainer: {
		paddingHorizontal: 8,
	},
});
