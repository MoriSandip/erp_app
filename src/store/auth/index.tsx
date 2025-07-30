import { createAsyncThunk } from '@reduxjs/toolkit';

import { Login, LoginError } from './types';

export const handleLogin = createAsyncThunk<
	Login,
	object,
	{ rejectValue: LoginError }
>('login/post', async (params: object, { rejectWithValue }) => {
	try {
		 //
		 return;
	} catch (err: unknown) {
		 
		return rejectWithValue({
			message: 'An unknown error occurred',
			error: null,
		});
	}
});
