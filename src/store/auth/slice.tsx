import { createSlice } from '@reduxjs/toolkit';

import { handleLogin } from './index';
import { AuthState } from './types';
import { RootState } from '..';

const initialState: AuthState = {
	isLoggedIn: false,
	error: null,
	loadingStatus: 'idle',
	token: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		handleLogout: state => {
			state = initialState;
			return state;
		},
	},
	extraReducers: builder => {
		builder.addCase(handleLogin.pending, state => {
			state.loadingStatus = 'loading';
			state.error = null;
		});
		builder.addCase(handleLogin.fulfilled, (state, { payload }) => {
			state.token = payload.token;
			state.loadingStatus = 'idle';
			state.error = null;
			state.isLoggedIn = true;
		});

		builder.addCase(handleLogin.rejected, (state, { payload }) => {
			if (payload) {
				state.error = payload.error;
			}
			state.loadingStatus = 'idle';
		});
	},
});

export const { handleLogout } = authSlice.actions;

/* SELECTORS */
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const fetchLoginLoadingStatus = (state: RootState) =>
	state.auth.loadingStatus;
export const fetchLoginErrorMessage = (state: RootState) => state.auth.error;

export default authSlice.reducer;
