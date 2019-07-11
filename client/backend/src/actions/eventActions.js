import axios from "../api";
import {
  ADD_EVENT,
  GET_EVENTS,
  GET_EVENT,
  DELETE_EVENT,
  EVENT_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
  // SEARCH_EVENT,
} from "../actions/types";

export const addEvent = (eventData) => dispatch => {
  dispatch(clearErrors());
  axios.post("/events/add", eventData)
    .then(res =>
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      })
    )
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true
          }
        })
      }
    })
};


export const getEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get("/events?isArchived=")
    .then(res => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      });
    })
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true
          }
        })
      }
    })
};

export const getEvent = id => dispatch => {
  dispatch(setEventLoading());
  axios
    .get(`/events/${id}`)
    .then(res =>
      dispatch({
        type: GET_EVENT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const deleteEvent = id => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/events/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_EVENT,
        payload: id
      })
    )
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true
          }
        })
      }
    })
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
