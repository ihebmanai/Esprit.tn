import axios from "./../api";
import jwt_decode from "jwt-decode";
import {
  SET_CURRENT_USER,
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_PROFILE
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/user/register", userData)
    .then(res => history.push("/login"))
    .catch(err => console.log("jhgf"));
};

export const loginUser = userData => dispatch => {
  axios
    .post("/user/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("token", token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: err.response.data,
          visible: true
        }
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Set logged in user
const setProfile = user => {
  return {
    type: SET_PROFILE,
    payload: user
  };
};

export const getProfile = (web3, walletAddress) => dispatch => {
  axios.get(`user/wallet/${walletAddress}`).then((res) => {
    web3.eth.getBalance(walletAddress, (err, _balance) => {   
     const balance = web3.utils.fromWei(_balance.toString(), "ether");
     res.data = {...res.data, balance};
     dispatch(setProfile(res.data));
    });
  })
}
// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("token");
  dispatch(setCurrentUser({}));
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};