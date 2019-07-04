import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER,SET_PROFILE } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  profile:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER: 
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_PROFILE: 
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}
