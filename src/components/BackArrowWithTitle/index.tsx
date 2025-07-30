import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { BackArrowWithTitleProps } from './type';
import { styles } from './style';
import { BackArrow } from '../../assets/icons';

const BackArrowWithTitle = ({
	title,
	handleGoBack,
	isRightIconAvailable,
	handleRightIconPress,
	rightIcon,
}: BackArrowWithTitleProps) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handleGoBack}>
				<Image source={BackArrow} style={styles.icon} />
			</TouchableOpacity>
			<Text style={styles.title}>{title}</Text>
			{isRightIconAvailable ? (
				<TouchableOpacity
					style={styles.rightIcon}
					onPress={handleRightIconPress}
				>
					<Image source={rightIcon} style={styles.icon} />
				</TouchableOpacity>
			) : (
				<View style={styles.extraSpace} />
			)}
		</View>
	);
};

export default BackArrowWithTitle;
