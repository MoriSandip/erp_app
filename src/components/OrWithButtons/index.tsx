import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Apple, Google } from '../../assets/icons';
import { OrWithButtonsProps } from './type';
import { styles } from './style';

const OrWithButtons = ({ tapHandler, isFromLogin }: OrWithButtonsProps) => {
	const { t } = useTranslation();

	return (
		<View style={styles.cardContainer}>
			<View style={styles.container}>
				<View style={styles.line}>
					<View style={styles.inlLineL} />
				</View>
				<Text
					style={[
						styles.orLoginText,
						styles.widthLogin 
					]}
				>
					{isFromLogin
						? t('LOGIN.LABEL.OR_LOGIN_WITH')
						: t('SING_UP.LABEL.OR_SIGN_UP_WITH')}
				</Text>
				<View style={styles.line}>
					<View style={styles.inlLineR} />
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<View style={styles.button}>
					<View style={styles.iconTextContainer}>
						<Image source={Google} style={styles.icon} />
						<Text style={styles.label}>{t('LOGIN.LABEL.GOOGLE')}</Text>
					</View>
				</View>

				<View style={styles.button}>
					<View style={styles.iconTextContainer}>
						<Image source={Apple} style={styles.icon} />
						<Text style={styles.label}>{t('LOGIN.LABEL.APPLE')}</Text>
					</View>
				</View>
			</View>
			<View style={styles.bottomContainer}>
				<Text style={styles.needToFindYaFeetText}>
					{isFromLogin
						? t('LOGIN.LABEL.NEW_TO_FIND_YA_FEET')
						: t('SING_UP.LABEL.ALREADY_HAVE_AN_ACCOUNT')}
				</Text>
				<TouchableOpacity onPress={tapHandler}>
					<Text style={[isFromLogin ? styles.signUpText : styles.loginText]}>
						{isFromLogin ? t('LOGIN.SIGN_UP_BTN') : t('LOGIN.LOGIN_BTN')}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default OrWithButtons;
