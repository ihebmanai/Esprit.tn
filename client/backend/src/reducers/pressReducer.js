import {
    ADD_PRESS,
    GET_PRESS,
    GET_ALL_PRESS,
    DELETE_PRESS,
    PRESS_LOADING,
    SEARCH_PRESS,
    EDIT_PRESS
  } from "../actions/types";
  
  const initialState = {
    allPress: [],
    press: {},
    loading: false,
    search: [],
    searching :false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case PRESS_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_ALL_PRESS:
        return {
          ...state,
          allPress: action.payload,
          loading: false
        };
      case GET_PRESS:
        return {
          ...state,
          press: action.payload,
          loading: false
        };
      case ADD_PRESS:
        return {
          ...state,
          press: action.payload
        };
      case EDIT_PRESS:
          return {
            ...state,
            press: action.payload
          };
      case DELETE_PRESS:
        return {
          ...state,
          allPress: state.allPress.filter(press => press._id !== action.payload),
        };
      
      case SEARCH_PRESS: 
      return {
        ...state,
        search: action.payload.allPress,
        searching: action.payload.searching
      };
      default:
        return state;
    }
  }