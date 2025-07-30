import React from 'react';
import { View, Text } from 'react-native';

import { ErrorParamList } from './type';
import { styles } from './styles';

const ErrorMessage = ({ error, style }: ErrorParamList) => {
	return (
		<View style={[style]}>
			<Text style={styles.error}>{error || 'Something went wrong!'}</Text>
		</View>
	);
};

export default ErrorMessage;
