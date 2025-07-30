import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
;
import { SignUpFormProps } from './type';
import { styles } from './styles';
import FormInputWrapper from '../../../components/FormInputWrapper';
import { TickMark } from '../../../assets/icons';
import Button from '../../../components/Button';

const SignupForm = ({ isLoading }: { isLoading: boolean }) => {
	const { t } = useTranslation();
	const { values, handleSubmit, setFieldValue, isValid } =
		useFormikContext<SignUpFormProps>();

	return (
		<View style={styles.formContainer}>
			<FormInputWrapper<SignUpFormProps>
				fields={[
					{ name: 'fullName' },
					{ name: 'email' },
					{ name: 'password', secureTextEntry: true },
					{ name: 'confirmPassword', secureTextEntry: true },
				]}
			/>
			<View style={styles.iAggreeContainer}>
				<TouchableOpacity
					onPress={() =>
						setFieldValue('isTermAccepted', !values.isTermAccepted)
					}
				>
					{values.isTermAccepted ? (
						<Image source={TickMark} style={styles.icon} />
					) : (
						<View style={styles.iAggreeBox} />
					)}
				</TouchableOpacity>
				<Text style={styles.iAggreeText}>{t('SING_UP.LABEL.I_AGREE')}</Text>
				<Text style={styles.termsConditionText}>
					{t('SING_UP.LABEL.TERMS_OF_SERVICE')}
				</Text>
			</View>
			<Button
				label={t('LOGIN.SIGN_UP_BTN')}
				disabled={!isValid || !values.isTermAccepted}
				onPress={() => handleSubmit()}
				buttonStyle={styles.button}
				isLoading={isLoading}
			/>
		</View>
	);
};

export default SignupForm;
