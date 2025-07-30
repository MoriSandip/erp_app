import React from 'react';
import { Text, Image, ScrollView, Animated, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import LoginForm from './LoginForm';
import { LoginFormProps } from './type';
import { styles } from './styles';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { TextLogo } from '../../../assets/icons';
import OrWithButtons from '../../../components/OrWithButtons';
import KeyboardFix from '../../../components/KeyboardFix/KeyboardFix';
import { useAuthAnimatedSequence } from '../../../hooks/animation/useAuthAnimation';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchLoginErrorMessage, fetchLoginLoadingStatus } from '../../../store/auth/slice';

const LoginScreen = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const dispatch = useAppDispatch();

	const loadingStatus = useAppSelector(fetchLoginLoadingStatus);
	const errorMessage = useAppSelector(fetchLoginErrorMessage);

	const {
		logoScale,
		textFade,
		textRotate,
		formFade,
		formTranslateX,
		buttonFade,
		buttonTranslateY,
	} = useAuthAnimatedSequence();  // Using the hook for animations

	const handleNavigation = (screen: 'Signup' | 'ForgotPassword') => {
		navigation.navigate(screen);
	};

	const loginHandler = (values: LoginFormProps) => {
		// dispatch(handleLogin(values));
		navigation.replace('Dashboard')
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View>
				<ScreenWrapper>
					{/* Logo Animation (Scale Bounce) */}
					<Animated.View style={{ transform: [{ scale: logoScale }] }}>
						<Text style={{ fontSize: 44, fontWeight: 500 }}>Dev E&P</Text>
					</Animated.View>

					{/* Welcome Text Animation (Rotate + Fade) */}
					<Animated.View
						style={{
							opacity: textFade,
							transform: [
								{
									rotate: textRotate.interpolate({
										inputRange: [0, 1],
										outputRange: ['-10deg', '0deg'],
									}),
								},
							],
						}}
					>
						<Text style={styles.loginText}>{t('LOGIN.WELCOME_BACK')}</Text>
					</Animated.View>

					{/* Login Form Animation (Slide from Left) */}
					<Animated.View
						style={{
							opacity: formFade,
							transform: [{ translateX: formTranslateX }],
						}}
					>
						<LoginForm
							loginHandler={loginHandler}
							loadingStatus={loadingStatus}
							errorMessage={errorMessage}
							t={t}
							handleNavigation={handleNavigation}
						/>
					</Animated.View>

					{/* Buttons Animation (Slide from Bottom + Bounce) */}
					<Animated.View
						style={{
							opacity: buttonFade,
							transform: [{ translateY: buttonTranslateY }],
						}}
					>
						<OrWithButtons
							isFromLogin
							tapHandler={() => handleNavigation('Signup')}
						/>
					</Animated.View>
				</ScreenWrapper>

				<KeyboardFix />
			</View>
		</ScrollView>
	);
};

export default LoginScreen;
