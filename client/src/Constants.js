require("dotenv").config();

// URL'S

export const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL;

// GENERATE RANDOM TOKEN
export const GENERATE_ITEM_RANDOM =
  process.env.REACT_APP_GENERATE_SECRET_KEY_TOKEN;

// <------- CONSTANTES DE USUARIOS ------->

// REGISTER

export const REGISTER_USER_START = "REGISTER_USER_START";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

// LOGIN
export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

// profile

export const GET_USER_PROFILE_DATA_START = "GET_USER_PROFILE_DATA_START";
export const GET_USER_PROFILE_DATA_SUCCESS = "GET_USER_PROFILE_DATA_SUCCESS";
export const GET_USER_PROFILE_DATA_FAILURE = "GET_USER_PROFILE_DATA_FAILURE";

// LOGOUT
export const LOGOUT_USER = "LOGOUT_USER";

export const CLOSE_ALERTS = "CLOSE_ALERTS";

// RANDOMIZE THE LS STORE
export const RANDOM_PHRASES_SET_LS = process.env.RANDOM_PHRASES_SET_LS;
export const RANDOM_PHRASES_LS = process.env.RANDOM_PHRASES_LS;

// MAIN COLOR
export const MAIN_COLOR = "#DC200A";