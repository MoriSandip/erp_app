import { object, string, ref } from 'yup';

import { Shape, UpdatePasswordSchemaType } from './type';

type TranslateFunction = (key: string) => string;

export const updatePasswordSchema = (translate: TranslateFunction) => {
	return object<Shape<UpdatePasswordSchemaType>>({
		newPassword: string()
			.required(translate('LOGIN.ERRORS.EMPTY_NEW_PASSWORD'))
			.min(8, translate('LOGIN.ERRORS.INVALID_NEW_PASSWORD')),
		confirmPassword: string()
			.required(translate('SING_UP.ERRORS.EMPTY_CONFIRM_PASSWORD'))
			.oneOf(
				[ref('newPassword')],
				translate('SING_UP.ERRORS.PASSWORDS_NOT_MATCHING'),
			),
	});
};
