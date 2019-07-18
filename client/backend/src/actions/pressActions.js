import axios from "../api";
import {
  ADD_PRESS,
  GET_ALL_PRESS,
  GET_PRESS,
  DELETE_PRESS,
  PRESS_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
  UPDATE_PRESS
  // SEARCH_EVENT,
} from "../actions/types";

export const addPress = (eventData) => dispatch => {
  dispatch(clearErrors());
  axios.post("/press/add", eventData)
    .then(res =>
      dispatch({
        type: ADD_PRESS,
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




export const getAllPress = () => dispatch => {
  dispatch(setPressLoading());
  axios
    .get("/press")
    .then(res => {
      dispatch({
        type: GET_ALL_PRESS,
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

export const getPress = id => dispatch => {
  dispatch(setPressLoading());
  axios
    .get(`/press/${id}`)
    .then(res =>
      dispatch({
        type: GET_PRESS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};



export const deletePress = id => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/press/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PRESS,
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
export const setPressLoading = () => {
  return {
    type: PRESS_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
