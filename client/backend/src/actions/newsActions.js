import axios from '../api';
import { ADD_NEWS, GET_NEWS, GET_ALL_NEWS, DELETE_NEWS, GET_ERRORS, EDIT_NEWS, CLEAR_ERRORS } from '../actions/types';

export const addNews = (newsData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post('/news/add', newsData)
		.then((res) =>
			dispatch({
				type: ADD_NEWS,
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

export const editNews = (newsData, id) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.put(`/news/update/${id}`, newsData)
		.then((res) =>
			dispatch({
				type: EDIT_NEWS,
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

export const getAllNews = () => (dispatch) => {
	dispatch(clearErrors());

	axios
		.get('/news/')
		.then((res) => {
			dispatch({
				type: GET_ALL_NEWS,
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

export const getNews = (id) => (dispatch) => {
	dispatch(clearErrors());

	axios
		.get(`/news/${id}`)
		.then((res) =>
			dispatch({
				type: GET_NEWS,
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

export const deleteNews = (id) => (dispatch) => {
	dispatch(clearErrors());

	axios
		.delete(`/news/delete/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_NEWS,
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

// export const searchEvents = (min, max) => dispatch => {
//   const body = { min, max };
//   axios
//   .post('/EVENTs/search/',body)
//   .then(res =>
//     dispatch({
//       type: SEARCH_EVENT,
//       payload: res.data
//     })
//   )
//   .catch(error => {
//     if (error.response && error.response.data) {
//       dispatch({
//         type: GET_ERRORS,
//         payload: {
//           message: error.response.data,
//           visible: true
//         }
//       })
//     }
//   })
// }

// Set loading state
// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
