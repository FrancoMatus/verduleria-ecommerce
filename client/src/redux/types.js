require("dotenv").config();

export const REGISTER_USER_START = "REGISTER_USER_START";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const LOG_OUT_USER = "LOG_OUT_USER";

// DATA RELEASED FOR USER
export const GET_USER_PROFILE_DATA_START = "GET_USER_PROFILE_DATA_START";
export const GET_USER_PROFILE_DATA_SUCCESS = "GET_USER_PROFILE_DATA_SUCCESS";
export const GET_USER_PROFILE_DATA_FAILURE = "GET_USER_PROFILE_DATA_FAILURE";

export const UPDATE_AVATAR_START = "UPDATE_AVATAR_START";
export const UPDATE_AVATAR_SUCCESS = "UPDATE_AVATAR_SUCCESS";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
// ERROR MESSAGES

export const defaultLoginError = "Error en el ingreso.";
export const defaultRegisterError = "Error en el registro.";
export const CLOSE_ERROR_MESSAGE_REGISTER = "CLOSE_ERROR_MESSAGE_REGISTER";

export const CLOSE_ALERTS = "CLOSE_ALERTS";

// PRODUCTS

export const GET_ALL_PRODUCTS_START = "GET_ALL_PRODUCTS_START";
export const CREATE_PRODUCT_START = "CREATE_PRODUCT_START";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";

export const GET_ALL_PRODUCTS_FAILURE = "GET_ALL_PRODUCTS_FAILURE";
export const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";

// CATEGORIES

export const GET_ALL_CATEGORIES_START = "GET_ALL_CATEGORIES_START";
export const CREATE_CATEGORIES_START = "CREATE_CATEGORIES_START";
export const CREATE_CATEGORIES_SUCCESS = "CREATE_CATEGORIES_SUCCESS";
export const CREATE_CATEGORIES_FAILURE = "CREATE_CATEGORIES_FAILURE";
export const GET_ALL_CATEGORIES_FAILURE = "GET_ALL_CATEGORIES_FAILURE";
export const GET_ALL_CATEGORIES_SUCCESS = "GET_ALL_CATEGORIES_SUCCESS";

// CART
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
