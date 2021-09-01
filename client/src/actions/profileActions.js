import {
	GET_ERRORS,
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	SET_CURRENT_USER,
} from './types';

import axios from 'axios';

export const getCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading());

	axios
		.get('/api/profile')
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROFILE,
				payload: {},
			})
		);
};

export const getProfileByHandle = (handle) => (dispatch) => {
	dispatch(setProfileLoading());

	axios
		.get(`/api/profile/handle/${handle}`)
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROFILE,
				payload: null,
			})
		);
};

export const getProfileById = (id) => (dispatch) => {
	dispatch(setProfileLoading());

	axios
		.get(`/api/profile/user/${id}`)
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROFILE,
				payload: null,
			})
		);
};

export const getProfiles = () => (dispatch) => {
	dispatch(setProfileLoading());

	axios
		.get('/api/profile/all')
		.then((res) =>
			dispatch({
				type: GET_PROFILES,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROFILES,
				payload: null,
			})
		);
};

export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING,
	};
};

export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE,
	};
};

export const createProfile = (profileData, history) => (dispatch) => {
	axios
		.post('/api/profile', profileData)
		.then((res) => history.push('/dashboard'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const deleteAccount = () => (dispatch) => {
	if (
		window.confirm(
			'You are about to delete your account. This action cannot be undone.'
		)
	) {
		axios
			.delete('/api/profile/')
			.then((res) =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {},
				})
			)
			.catch((err) =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				})
			);
	}
};

export const addExperience = (newExperience, history) => (dispatch) => {
	axios
		.post('/api/profile/experience', newExperience)
		.then((res) => history.push('/dashboard'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const addEducation = (newEducation, history) => (dispatch) => {
	axios
		.post('/api/profile/education', newEducation)
		.then((res) => history.push('/dashboard'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const deleteExp = (id) => (dispatch) => {
	if (
		window.confirm('You are about to delete. This action cannot be undone.')
	) {
		axios
			.delete(`/api/profile/experience/${id}`)
			.then((res) =>
				dispatch({
					type: GET_PROFILE,
					payload: res.data,
				})
			)
			.catch((err) =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				})
			);
	}
};

export const deleteEdu = (id) => (dispatch) => {
	if (
		window.confirm('You are about to delete. This action cannot be undone.')
	) {
		axios
			.delete(`/api/profile/education/${id}`)
			.then((res) =>
				dispatch({
					type: GET_PROFILE,
					payload: res.data,
				})
			)
			.catch((err) =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				})
			);
	}
};
