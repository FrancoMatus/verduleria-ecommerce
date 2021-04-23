import {
  REGISTER_USER_START,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  CLOSE_ALERTS,
  LOG_OUT_USER,
  GET_USER_PROFILE_DATA_START,
  GET_USER_PROFILE_DATA_SUCCESS,
  GET_USER_PROFILE_DATA_FAILURE,
} from "../types";
import { api } from "../../services/api";

export const registerUser = (data) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_START });
  try {
    const res = await api.post(`/api/auth/signup`, data);
    if (res.status === 200) {
      const { token } = res.data;
      const {
        firstName,
        lastName,
        username,
        email,
        phone,
        id,
        isAdmin,
      } = res.data;
      localStorage.setItem(
        "userData",
        JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          phone,
          id,
          isAdmin,
        })
      );
      localStorage.setItem("userToken", JSON.stringify(token));
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          firstName,
          lastName,
          username,
          email,
          phone,
          id,
          isAdmin,
        },
      });
    }
  } catch (error) {
    const {
      response: {
        data: errorMessage = "Ha ocurrido un error en el servidor.",
      } = { data: "" },
    } = error;
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: errorMessage,
    });
  }
};

export const loginUser = (data) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_START });
  const token = JSON.parse(localStorage.getItem("userToken"));
  const headers = { "Content-Type": "application/json", "auth-token": token };
  try {
    const res = await api.post(`/api/auth/signin`, data, { headers });

    if (res.status === 200) {
      const {
        firstName,
        lastName,
        username,
        email,
        phone,
        id,
        token,
        isAdmin,
      } = res.data;
      localStorage.setItem(
        "userData",
        JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          phone,
          id,
          isAdmin,
        })
      );
      localStorage.setItem("userToken", JSON.stringify(token));
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          firstName,
          lastName,
          username,
          email,
          phone,
          id,
          isAdmin,
        },
      });
    }
  } catch (error) {
    const {
      response: {
        data: errorMessage = "Ha ocurrido un error en el servidor",
      } = { data: "" },
    } = error;
    console.log(error.response.data);
    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getUserProfileData = () => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_DATA_START });
  try {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const headers = { "Content-Type": "application/json", "auth-token": token };
    const res = await api.get(`/api/auth/profile`, {
      headers,
    });
    const resData = res.data;
    dispatch({
      type: GET_USER_PROFILE_DATA_SUCCESS,
      payload: resData,
    });
  } catch (err) {
    const { response: { data: errorMessage = "Server error" } = {} } = err;
    dispatch({
      type: GET_USER_PROFILE_DATA_FAILURE,
      payload: errorMessage,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOG_OUT_USER });
  localStorage.removeItem("userData");
  localStorage.removeItem("userToken");
};

export const handleCloseAlert = () => (dispatch) => {
  dispatch({ type: CLOSE_ALERTS });
};
