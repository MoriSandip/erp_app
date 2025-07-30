import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, View } from 'react-native';

import { styles } from './style';

const KeyboardFix = () => {
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	useEffect(() => {
		const showListener = Keyboard.addListener('keyboardDidShow', e => {
			setKeyboardHeight(e.endCoordinates.height);
		});
		const hideListener = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardHeight(0);
		});

		return () => {
			showListener.remove();
			hideListener.remove();
		};
	}, []);
	return (
		<View
			style={[
				styles.container,
				keyboardHeight !== 0 && { marginBottom: Platform.OS === 'ios' ? keyboardHeight : 0},
			]}
		/>
	);
};

export default KeyboardFix;
