import { StyleSheet } from 'react-native';

import { Style } from './type';
import AppTheme from '../../styles/theme';
import { fontFamily } from '../../styles/fonts';

export const styles = StyleSheet.create<Style>({
	container: {
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 24,
	},
	icon: {
		height: 24,
		width: 24,
	},
	extraSpace: {
		height: 24,
		width: 24,
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
		color: AppTheme.colors.black,
		lineHeight: 48,
		fontFamily: fontFamily.regular,
	},
	rightIcon: {
		height: 34,
		width: 34,
		backgroundColor: AppTheme.colors.selectedColor,
		borderRadius: 17,
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
});
