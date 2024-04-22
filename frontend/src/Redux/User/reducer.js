import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionType";

const initalState = {
  isAuth: false,
  isLoading: false,
  isError: false,
  token: null,
};

export const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST: {
      return { ...state, isLoading: true, isError: false };
    }
    case LOGIN_SUCCESS:
     {
      return { ...state, isLoading: false, isAuth: true, token: payload };
    }
    case SIGNUP_SUCCESS:{
      return {...state, isLoading:false, isError:false}
    }
    
    case LOGIN_ERROR:
    case SIGNUP_ERROR: {
      return { ...state, isLoading: false, isError: true };
    }
    case LOGOUT: {
      return { ...initalState };
    }
    default: {
      return state;
    }
  }
};
