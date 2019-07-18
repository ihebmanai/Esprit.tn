import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";
import pressReducer from "./pressReducer";


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  event: eventReducer,
  press:pressReducer
});
