import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { ForgotFormProps } from './type';
import { styles } from './styles';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { BackArrow, TextLogo } from '../../../assets/icons';
import FormInputWrapper from '../../../components/FormInputWrapper';
import ErrorMessage from '../../../components/ErrorMessage';
import Button from '../../../components/Button';
import KeyboardFix from '../../../components/KeyboardFix/KeyboardFix';
import { useAuthAnimatedSequence } from '../../../hooks/animation/useAuthAnimation';
import { useAppSelector } from '../../../store/hooks';
import { fetchLoginErrorMessage, fetchLoginLoadingStatus } from '../../../store/auth/slice';

const ForgotPasswordScreen = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const loadingStatus = useAppSelector(fetchLoginLoadingStatus);
	const errorMessage = useAppSelector(fetchLoginErrorMessage);

	const initialValues = {
		email: '',
	};

	const continueHandler = () => {
		navigation.navigate('ResetPassword');
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	// Use the shared animation hook
	const {
		logoScale,
		textFade,
		formFade,
		formTranslateX,
		buttonFade,
		buttonTranslateY
	} = useAuthAnimatedSequence();

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<ScreenWrapper>
				{/* Back Button */}
				<TouchableOpacity style={styles.backArrow} onPress={handleGoBack}>
					<Image source={BackArrow} style={[styles.icon]} />
				</TouchableOpacity>

				{/* Logo Animation */}
				<Animated.View style={{ transform: [{ scale: logoScale }] }}>
						 <Text style={{fontSize: 44, fontWeight: 500}}>Dev E&P</Text>
				</Animated.View>

				{/* Text Animation */}
				<Animated.View style={{ opacity: textFade }}>
					<Text style={styles.forgotText}>
						{t('FORGOTPASSWORD.LABEL.FORGOT_PASSWORD')}
					</Text>
					<Text style={styles.text}>{t('FORGOTPASSWORD.LABEL.ENTER_EMAIL')}</Text>
				</Animated.View>

				{/* Form Animation */}
				<Animated.View
					style={{ opacity: formFade, transform: [{ translateX: formTranslateX }] }}
				>
					<Formik
						initialValues={initialValues}
						onSubmit={() => continueHandler()}
					>
						{(props: FormikProps<ForgotFormProps>) => {
							const { isValid, handleSubmit } = props;
							return (
								<View style={styles.formContainer}>
									<FormInputWrapper<ForgotFormProps>
										fields={[{ name: 'email' }]}
									/>
									{errorMessage && <ErrorMessage error={errorMessage} />}
								
									{/* Button Animation */}
									<Animated.View style={{ opacity: buttonFade, transform: [{ translateY: buttonTranslateY }] }}>
										<Button
											label={t('FORGOTPASSWORD.BUTTON')}
											disabled={!isValid}
											onPress={() => handleSubmit()}
											isLoading={loadingStatus === 'loading'}
										/>
									</Animated.View>
									
								</View>
							);
						}}
					</Formik>
				</Animated.View>

				
			</ScreenWrapper>
			<KeyboardFix />
		</ScrollView>
	);
};

export default ForgotPasswordScreen;
