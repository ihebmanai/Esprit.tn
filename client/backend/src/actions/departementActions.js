import axios from '../api';
import {
	ADD_DEPARTEMENT,
	GET_DEPARTEMENT,
	GET_ALL_DEPARTEMENT,
	DELETE_DEPARTEMENT,
	GET_ERRORS,
	EDIT_DEPARTEMENT
} from '../actions/types';

export const addNews = (depData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post('/departement/add', depData)
		.then((res) =>
			dispatch({
				type: ADD_DEPARTEMENT,
				payload: res.data
			})
		)
		.catch((error) => {
			if (error.response && error.response.data) {
				dispatch({
					type: GET_ERRORS,
					payload: {
						message: error.response.data,
						visible: true
					}
				});
			}
		});
};

export const editDep = (depData, id) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.put(`/departement/update/${id}`, depData)
		.then((res) =>
			dispatch({
				type: EDIT_DEPARTEMENT,
				payload: res.data
			})
		)
		.catch((error) => {
			if (error.response && error.response.data) {
				dispatch({
					type: GET_ERRORS,
					payload: {
						message: error.response.data,
						visible: true
					}
				});
			}
		});
};

export const getAllDeps = () => (dispatch) => {
	dispatch(setEventLoading());
	axios
		.get('/departement/')
		.then((res) => {
			dispatch({
				type: GET_ALL_DEPARTEMENT,
				payload: res.data
			});
		})
		.catch((error) => {
			if (error.response && error.response.data) {
				dispatch({
					type: GET_ERRORS,
					payload: {
						message: error.response.data,
						visible: true
					}
				});
			}
		});
};

export const getDep = (id) => (dispatch) => {
	dispatch(setEventLoading());
	axios
		.get(`/departement/${id}`)
		.then((res) =>
			dispatch({
				type: GET_DEPARTEMENT,
				payload: res.data
			})
		)
		.catch((error) => {
			if (error.response && error.response.data) {
				dispatch({
					type: GET_ERRORS,
					payload: {
						message: error.response.data,
						visible: true
					}
				});
			}
		});
};

export const deleteDep = (id) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.delete(`/departement/delete/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_DEPARTEMENT,
				payload: id
			})
		)
		.catch((error) => {
			if (error.response && error.response.data) {
				dispatch({
					type: GET_ERRORS,
					payload: {
						message: error.response.data,
						visible: true
					}
				});
			}
		});
};

// Set loading state
export const setEventLoading = () => {
	return {
		type: EVENT_LOADING
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
