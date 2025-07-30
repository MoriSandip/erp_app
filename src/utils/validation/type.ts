import { ObjectShape } from 'yup';

type ObjectShapeValues = ObjectShape extends Record<string, infer V>
	? V
	: never;

export type Shape<T extends Record<string, unknown>> = Partial<
	Record<keyof T, ObjectShapeValues>
>;

export interface LoginSchemaType {
	email: string;
	password: string;
}

export interface SignUpSchemaType {
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
}
export interface ForgotSchemaType {
	email: string;
}

export interface EditProfileSchemaType {
	email: string;
	fullName: string;
}

export interface UpdatePasswordSchemaType {
	password: string;
	confirmPassword: string;
}
