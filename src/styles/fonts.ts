import { Platform } from 'react-native';

export const fontFamily = {
	bold: 'Latino Gothic Cnd Bold',
	regular: Platform.OS === 'ios' ? 'Latino Gothic' : 'LatinoGothic-CndBold',
	kalamRegular: Platform.OS === 'ios' ? 'Kalam' : 'Kalam-Regular',
	DynamicSchematic:
		Platform.OS === 'ios'
			? 'Dynamic Schematic Regular'
			: 'DynamicSchematic-Regular',
};
