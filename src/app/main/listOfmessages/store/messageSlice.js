/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'app/services/api/';

export const getOne = createAsyncThunk('message/getOne', async (id, { dispatch }) => {
	const response = await ApiService.doGet(`/message/${id}`);
	const message = await response;

	return { ...message };
});

export const saveOne = createAsyncThunk('message/saveOne', async (data, { dispatch }) => {
	const request = { ...data, id_login: 1 };

	const response = await ApiService.doPost('/message', request);
	if (!response.error) {
		dispatch(updateResponse(response.data));
		return data;
	}

	return { ...data, message: 'Done', success: 'Ok' };
});

export const updateOne = createAsyncThunk('message/updateOne', async ({ data, id }, { dispatch, getState }) => {
	const request = { ...data };
	console.log(request);

	const response = await ApiService.doPut(`/message/${id}`, request);
	const oldState = getState().message;

	if (response.error) {
		dispatch(updateResponse(response.data));
		return { ...data, id, loading: false };
	}

	dispatch(getOne(id));

	return { ...oldState, message: 'Done', success: 'Ok' };
});

export const deleteOne = createAsyncThunk('message/deleteOne', async ({ data, id }, { dispatch, getState }) => {
	const request = { ...data };

	const response = await ApiService.doDelete(`/message/${id}`);

	return { message: 'Done', success: 'Ok' };
});

const initialState = {
	message: '',
	loading: false,
	title: '',
	description: ''
};

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		newData: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: 'new',
					title: '',
					description: '',
					loading: false,
					message: ''
				}
			})
		},
		clearState: (state, action) => initialState,
		updateState: (state, action) => {
			return { ...state, ...action.payload };
		},
		updateResponse: (state, action) => {
			state.success = action.payload.success;
			state.message = action.payload.message;
		},
		updateLoading: (state, action) => {
			state.loading = action.payload;
		}
	},
	extraReducers: {
		[getOne.fulfilled]: (state, action) => action.payload,
		[saveOne.fulfilled]: (state, action) => action.payload,
		[updateOne.fulfilled]: (state, action) => action.payload
	}
});

export const { newData, updateResponse, updateLoading } = messageSlice.actions;

export default messageSlice.reducer;
