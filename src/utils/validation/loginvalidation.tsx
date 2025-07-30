import { object, string } from 'yup';

import { LoginSchemaType, Shape } from './type';

type TranslateFunction = (key: string) => string;

export const loginSchema = (translate: TranslateFunction) => {
	return object<Shape<LoginSchemaType>>({
		email: string()
			.required(translate('LOGIN.ERRORS.EMPTY_EMAIL'))
			.email(translate('LOGIN.ERRORS.INVALID_EMAIL')),
		password: string()
			.required(translate('LOGIN.ERRORS.EMPTY_PASSWORD'))
			.min(8, translate('LOGIN.ERRORS.INVALID_PASSWORD')),
	});
};
