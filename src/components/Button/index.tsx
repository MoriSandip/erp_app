import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, ImageBackground, View } from 'react-native';

import { ButtonParamList } from './type';
import { styles } from './styles';

const Button = ({
	label,
	buttonStyle,
	labelTextStyle,
	disabled,
	onPress,
	isLoading,
	type
}: ButtonParamList) => {
	const btnRed = 'https://res.cloudinary.com/dht4ddwtn/image/upload/v1741735829/Group_150_jtqiui.png';
	const btnBlack = 'https://res.cloudinary.com/dht4ddwtn/image/upload/v1741735839/Group_152_k7eqmn.png';
	const btnYellow = 'https://res.cloudinary.com/dht4ddwtn/image/upload/v1741735830/Group_5_zbomdk.png';
	const btnWhite = 'https://res.cloudinary.com/dht4ddwtn/image/upload/v1741735834/Group_151_cyex22.png';
	const btnGame = 'https://res.cloudinary.com/dht4ddwtn/image/upload/v1741819009/button-rectangle_1_dmadwa.png';


	const renderButtonUrl = () => {
		switch (type) {
			case 'red':

				return btnRed;
			case 'yellow':
				return btnYellow;
			case 'black':
				return btnBlack;
			case 'white':
				return btnWhite;
			case 'game':
				return btnGame;

			default:
				return btnBlack
		}
	}
	const renderLabelOrLoader = () => {
		if (isLoading) {
			return (
				<ActivityIndicator
					size="small"
					color="white"
					style={styles.activityIndicator}
				/>
			);
		}
		return <Text style={[styles.labelText, labelTextStyle]}>{label}</Text>;
	};

	return (
		<View
			style={[
				styles.container,
				buttonStyle,
			]}
		>
			<ImageBackground
				source={{
					uri: renderButtonUrl()
				}}
				style={{
					// height: 76
				}}
				resizeMode='contain'
			>
				<TouchableOpacity
					style={{
						height: '100%',
						alignContent: 'center',
						alignItems: 'center',
						justifyContent: 'center'
					}}
					disabled={disabled}
					onPress={onPress}
				>

					{renderLabelOrLoader()}
				</TouchableOpacity>
			</ImageBackground>
		</View>


	);
};

export default Button;
