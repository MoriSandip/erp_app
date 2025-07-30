import React, { useState } from 'react';
import {
	View,
	TextInput as Input,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';
 
import { EyeOff, EyeOn } from '../../assets/icons';
import { TextInputParamList } from './type';
import AppTheme from '../../styles/theme';
import { styles } from './styles';

const TextInput = ({
	placeholder,
	onChangeText,
	value,
	style,
	keyboardType,
	maxLength,
	isInvalid,
	errorMessage,
	autoCorrect,
	secureTextEntry,
	onSubmitEditing,
	onRef,
	returnKeyType,
	blurOnSubmit,
	onBlur,
	label,
	isPassword,
}: TextInputParamList & { isPassword?: boolean }) => {
	const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);

	const togglePasswordVisibility = () => {
		setPasswordVisible(!isPasswordVisible);
	};

	const renderEyeIcon = () => {
		if (isPasswordVisible) {
			return <Image source={EyeOff} style={styles.icon} />;
		}
		return <Image source={EyeOn} style={styles.icon} />;
	};

	return (
		<View style={[style]}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.inputContainer}>
				<Input
					style={[
						styles.textInput,
						isInvalid && styles.invalid,
						!isInvalid && value !== '' && styles.isValid,
					]}
					placeholder={placeholder}
					value={value}
					keyboardType={keyboardType}
					autoCorrect={autoCorrect}
					secureTextEntry={isPassword ? isPasswordVisible : secureTextEntry}
					ref={onRef}
					returnKeyType={returnKeyType}
					maxLength={maxLength}
					onChangeText={onChangeText}
					onSubmitEditing={onSubmitEditing}
					blurOnSubmit={blurOnSubmit}
					placeholderTextColor={AppTheme.colors.platformColor}
					onBlur={onBlur}
				/>
				{isPassword && (
					<TouchableOpacity
						style={styles.eyeIconContainer}
						onPress={() => togglePasswordVisibility()}
					>
						{renderEyeIcon()}
					</TouchableOpacity>
				)}
			</View>
			{isInvalid && (
				<Text style={styles.error}>
					{!errorMessage ? `${placeholder} is required` : errorMessage}
				</Text>
			)}
		</View>
	);
};

export default TextInput;
