import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';

const resources = {
	en: {
		translation: en,
	},
} as const;

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	resources,
	lng: 'en',
	fallbackLng: 'en',
	debug: false,
	interpolation: {
		escapeValue: false, // react is already safe from xss
	},
});

export default i18n;
