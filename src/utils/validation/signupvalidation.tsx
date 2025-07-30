import { object, string, ref } from 'yup';

import { Shape, SignUpSchemaType } from './type';

type TranslateFunction = (key: string) => string;

export const signupSchema = (translate: TranslateFunction) => {
	return object<Shape<SignUpSchemaType>>({
		fullName: string()
			.required(translate('SING_UP.ERRORS.EMPTY_FULL_NAME'))
			.min(2, translate('SING_UP.ERRORS.INVALID_FULL_NAME')),
		email: string()
			.required(translate('LOGIN.ERRORS.EMPTY_EMAIL'))
			.email(translate('LOGIN.ERRORS.INVALID_EMAIL')),
		password: string()
			.required(translate('LOGIN.ERRORS.EMPTY_PASSWORD'))
			.min(8, translate('LOGIN.ERRORS.INVALID_PASSWORD')),
		confirmPassword: string()
			.required(translate('SING_UP.ERRORS.EMPTY_CONFIRM_PASSWORD'))
			.oneOf(
				[ref('password')],
				translate('SING_UP.ERRORS.PASSWORDS_NOT_MATCHING'),
			),
	});
};
