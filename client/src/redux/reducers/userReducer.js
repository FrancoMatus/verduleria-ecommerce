import {
  REGISTER_USER_FAILURE,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  CLOSE_ALERTS,
  LOG_OUT_USER,
} from "../types";

const initialState = {
  user: JSON.parse(localStorage.getItem("userData")) || "",
  errorMessageLogin: "",
  errorMessageRegister: "",
  statusMessage: "",
  alertMessage: "",
};

export default function usersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case REGISTER_USER_START:
      return {
        ...state,
      };
    case REGISTER_USER_SUCCESS: {
      const { username } = payload;
      return {
        ...state,
        user: payload,
        alertMessage: `Bienvenido, ${username}!`,
        statusMessage: "success",
        errorMessageRegister: "",
      };
    }
    case LOGIN_USER_START:
      return {
        ...state,
      };
    case LOGIN_USER_SUCCESS: {
      const { username } = payload;
      return {
        ...state,
        user: payload,
        alertMessage: `Bienvenido nuevamente, ${username}`,
        statusMessage: "success",
        errorMessageLogin: "",
      };
    }
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        errorMessageRegister: payload,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        statusMessage: "error",
        errorMessageLogin: payload,
      };
    case CLOSE_ALERTS:
      return {
        ...state,
        errorMessageLogin: "",
        errorMessageRegister: "",
        statusMessage: "",
        alertMessage: "",
      };
    case LOG_OUT_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
