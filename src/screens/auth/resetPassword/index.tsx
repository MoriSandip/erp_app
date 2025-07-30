import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { ResetPasswordFormProps } from './type';
import { styles } from './styles';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { BackArrow, TextLogo } from '../../../assets/icons';
import { resetPasswordSchema } from '../../../utils/validation/resetPassword';
import FormInputWrapper from '../../../components/FormInputWrapper';
import ErrorMessage from '../../../components/ErrorMessage';
import Button from '../../../components/Button';
import KeyboardFix from '../../../components/KeyboardFix/KeyboardFix';
import { useAuthAnimatedSequence } from '../../../hooks/animation/useAuthAnimation';
import { useAppSelector } from '../../../store/hooks';
import { fetchLoginErrorMessage, fetchLoginLoadingStatus } from '../../../store/auth/slice';

const ResetPasswordScreen = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const loadingStatus = useAppSelector(fetchLoginLoadingStatus);
	const errorMessage = useAppSelector(fetchLoginErrorMessage);

	const initialValues = {
		password: '',
		passwordConfirm: '',
	};

	const saveHandler = () => {
		navigation.navigate('PinSet');
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
			<ScreenWrapper style={styles.container}>
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
					<Text style={styles.resetText}>{t('RESETPASSWORD.LABEL.RESET_PASSWORD')}</Text>
				</Animated.View>

				{/* Form Animation */}
				<Animated.View style={{ opacity: formFade, transform: [{ translateX: formTranslateX }] }}>
					<Formik
						initialValues={initialValues}
						onSubmit={() => saveHandler()}
						validationSchema={resetPasswordSchema(t)}
					>
						{(props: FormikProps<ResetPasswordFormProps>) => {
							const { handleSubmit, isValid } = props;
							return (
								<View style={styles.formContainer}>
									<FormInputWrapper<ResetPasswordFormProps>
										fields={[
											{ name: 'password', secureTextEntry: true },
											{ name: 'passwordConfirm', secureTextEntry: true },
										]}
									/>
									{errorMessage && <ErrorMessage error={errorMessage} />}

									{/* Button Animation */}
									<Animated.View style={{ opacity: buttonFade, transform: [{ translateY: buttonTranslateY }] }}>
										<Button
											label={t('RESETPASSWORD.BUTTON')}
											disabled={!isValid}
											onPress={() => handleSubmit()}
											buttonStyle={styles.buttonSave}
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

export default ResetPasswordScreen;
