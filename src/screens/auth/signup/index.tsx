import React from 'react';
import { Text, Image, ScrollView, SafeAreaView, Animated, View } from 'react-native';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import SignupForm from './SignupForm';
import { SignUpFormProps } from './type';
import { styles } from './styles';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { TextLogo } from '../../../assets/icons';
import { signupSchema } from '../../../utils/validation/signupvalidation';
import OrWithButtons from '../../../components/OrWithButtons';
import KeyboardFix from '../../../components/KeyboardFix/KeyboardFix';
import { useAuthAnimatedSequence } from '../../../hooks/animation/useAuthAnimation';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchLoginLoadingStatus } from '../../../store/auth/slice';
import { handleLogin } from '../../../store/auth';

const SignupScreen = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const loadingStatus = useAppSelector(fetchLoginLoadingStatus);

	const initialValues: SignUpFormProps = {
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
		isTermAccepted: false,
	};

	const signupHandler = (values: object) => {
		dispatch(handleLogin(values));
	};

	const loginNavigationHandler = () => {
		navigation.goBack();
	};

	// Use the same animation hook as LoginScreen
	const {
		logoScale,
		textFade,
		textRotate,
		formFade,
		formTranslateX,
		buttonFade,
		buttonTranslateY,
	} = useAuthAnimatedSequence();

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<ScreenWrapper style={styles.container}>
				<SafeAreaView />

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
					<Text style={styles.startedText}>
						{t('SING_UP.LABEL.GET_STARTED')}
					</Text>
				</Animated.View>

				{/* Signup Form Animation (Slide from Left) */}
				<Animated.View
					style={{
						opacity: formFade,
						transform: [{ translateX: formTranslateX }],
					}}
				>
					<Formik
						initialValues={initialValues}
						onSubmit={signupHandler}
						validationSchema={signupSchema(t)}
					>
						{() => <SignupForm isLoading={loadingStatus === 'loading'} />}
					</Formik>
				</Animated.View>


				{/* Buttons Animation (Slide from Bottom + Bounce) */}
				<View>
					<Animated.View
						style={{
							opacity: buttonFade,
							transform: [{ translateY: buttonTranslateY }],
						}}
					>
						<OrWithButtons
							isFromLogin={false}
							tapHandler={loginNavigationHandler}
						/>
					</Animated.View>
				</View>

			</ScreenWrapper>
			<KeyboardFix />
		</ScrollView>
	);
};

export default SignupScreen;
