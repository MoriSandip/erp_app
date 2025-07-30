import React from 'react';
import { ImageBackground, StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import AppTheme from '../../styles/theme';
import { getDeviceHeight } from '../../utils/helpers';


interface ScreenWrapperProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {
	return (
		<ImageBackground 
		 
		style={[styles.container, style]}>
			<StatusBar backgroundColor={'#000'}/>
			{children}
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		height: getDeviceHeight(),
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		padding: 30,
		backgroundColor: AppTheme.colors.Secondary,
	},
});

export default ScreenWrapper;
