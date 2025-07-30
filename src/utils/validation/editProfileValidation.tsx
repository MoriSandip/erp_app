import { object, string } from 'yup';

import { EditProfileSchemaType, Shape } from './type';

type TranslateFunction = (key: string) => string;

export const editProfileSchema = (translate: TranslateFunction) => {
	return object<Shape<EditProfileSchemaType>>({
		email: string()
			.required(translate('LOGIN.ERRORS.EMPTY_EMAIL'))
			.email(translate('LOGIN.ERRORS.INVALID_EMAIL')),
		fullName: string()
			.required(translate('SING_UP.ERRORS.EMPTY_FULL_NAME'))
			.min(2, translate('SING_UP.ERRORS.INVALID_FULL_NAME')),
	});
};
