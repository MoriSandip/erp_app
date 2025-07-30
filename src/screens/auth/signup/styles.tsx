import { StyleSheet } from 'react-native';

import { Style } from './type';
import AppTheme from '../../../styles/theme';
import { fontFamily } from '../../../styles/fonts';

export const styles = StyleSheet.create<Style>({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		padding: 30,
		backgroundColor: AppTheme.colors.Secondary,
	},
	startedText: {
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
	iAggreeText: {
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 20,
		color: AppTheme.colors.black,
		marginLeft: 10,
		fontFamily: fontFamily.regular,
	},
	termsConditionText: {
		fontWeight: '600',
		fontSize: 14,
		lineHeight: 20,
		color: AppTheme.colors.black,
		marginLeft: 2,
		fontFamily: fontFamily.regular,
	},
	logo: {
		height: 100,
		marginTop: 37,
		marginBottom: 30,
	},
	blankSpace: {
		height: '12%',
	},
	iAggreeContainer: {
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		marginTop: 15,
	},
	iAggreeBox: {
		height: 20,
		width: 20,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: AppTheme.colors.buttonColor,
	},
	icon: {
		height: 20,
		width: 20,
	},
	button: {
		marginTop: 25,
	},
});
