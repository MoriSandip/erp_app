import { object, string } from 'yup';

import { ForgotSchemaType, Shape } from './type';

type TranslateFunction = (key: string) => string;

export const forgotSchema = (translate: TranslateFunction) => {
	return object<Shape<ForgotSchemaType>>({
		email: string()
			.required(translate('LOGIN.ERRORS.EMPTY_EMAIL'))
			.email(translate('LOGIN.ERRORS.INVALID_EMAIL')),
	});
};
