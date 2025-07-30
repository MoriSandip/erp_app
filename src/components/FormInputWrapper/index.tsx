import React from 'react';
import { View } from 'react-native';
import { useFormikContext, FormikValues } from 'formik';
import { useTranslation } from 'react-i18next';

import { styles } from './style';
import TextInput from '../TextInput';

interface FormInputWrapperProps<T extends FormikValues> {
	fields: Array<{ name: keyof T; secureTextEntry?: boolean }>;
}

const FormInputWrapper = <T extends FormikValues>({
	fields,
}: FormInputWrapperProps<T>) => {
	const { values, handleChange, setFieldTouched, errors, touched } =
		useFormikContext<T>();

	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			{fields.map(({ name, secureTextEntry = false }) => (
				<TextInput
					key={String(name)}
					placeholder={t(`FORM.PLACEHOLDER.${String(name).toUpperCase()}`)}
					value={values[name] as string}
					onChangeText={handleChange(name as string)}
					onBlur={() => setFieldTouched(name as string)}
					style={styles.textInputContainer}
					isInvalid={!!(touched[name] && errors[name])}
					errorMessage={errors[name] as string}
					label={t(`FORM.LABEL.${String(name).toUpperCase()}`)}
					secureTextEntry={secureTextEntry}
					isPassword={secureTextEntry}
				/>
			))}
		</View>
	);
};

export default FormInputWrapper;
