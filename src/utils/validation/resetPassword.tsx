import { object, string, ref } from 'yup';

type TranslateFunction = (key: string) => string;

export const resetPasswordSchema = (translate: TranslateFunction) => {
	return object({
		password: string()
			.required(translate('RESETPASSWORD.ERRORS.EMPTY_PASSWORD'))
			.min(8, translate('RESETPASSWORD.ERRORS.INVALID_PASSWORD')),
		passwordConfirm: string()
			.required(translate('RESETPASSWORD.ERRORS.EMPTY_CONFIRM_PASSWORD'))
			.oneOf(
				[ref('password')],
				translate('RESETPASSWORD.ERRORS.PASSWORDS_NOT_MATCHING'),
			),
	});
};
