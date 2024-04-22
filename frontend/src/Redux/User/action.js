
import axios from "axios";
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionType";


export const signIn = (userData) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  axios
    .post(
      "https://task-mamagment-backend.onrender.com/users/login",
      userData
    )
    .then((res) => {
      const token = res.data.token
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      localStorage.setItem('token', token)
      // console.log(res)
    })
    .catch(() => {
      // console.log(err.response.data)
      dispatch({ type: LOGIN_ERROR });
    });
};

export const register = (formData) => (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  axios
    .post(
      "https://task-mamagment-backend.onrender.com/users/register",
      formData
    )
    .then((res) => {
      const token = res.data.token;
      dispatch({ type: SIGNUP_SUCCESS, payload: token });
      localStorage.setItem('token', token);
    })
    .catch(() => {
      dispatch({ type: SIGNUP_ERROR });
    });
};

// export const register = (formData) => (dispatch) => {
//   dispatch({ type: SIGNUP_REQUEST });
//   axios
//     .post(
//       "http://localhost:9090/users/register",
//       formData
//     )
//     .then(() => {
//       // No need to store token in local storage during signup
//       dispatch({ type: SIGNUP_SUCCESS });
//     })
//     .catch(() => {
//       dispatch({ type: SIGNUP_ERROR });
//     });
// };


export const LogoutUsers = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({type:LOGOUT});
};
