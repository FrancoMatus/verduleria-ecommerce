import {
  GET_ALL_CATEGORIES_START,
  CREATE_CATEGORIES_START,
  CREATE_CATEGORIES_SUCCESS,
  CREATE_CATEGORIES_FAILURE,
  GET_ALL_CATEGORIES_FAILURE,
  GET_ALL_CATEGORIES_SUCCESS,
} from "../types";
import { api } from "../../services/api";

export const getAllCategories = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CATEGORIES_START });
  try {
    const res = await api.get(`/api/categories/all`);

    if (res.status === 200) {
      const allCategories = res.data;
      dispatch({
        type: GET_ALL_CATEGORIES_SUCCESS,
        payload: allCategories,
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
      type: GET_ALL_CATEGORIES_FAILURE,
      payload: errorMessage,
    });
  }
};

export const createCategories = (data) => async (dispatch) => {
  dispatch({ type: CREATE_CATEGORIES_START });
  const token = JSON.parse(localStorage.getItem("userToken"));
  const headers = { "Content-Type": "application/json", "auth-token": token };
  try {
    const res = await api.post(`/api/categories/create`, data, {
      headers,
    });

    if (res.status === 200) {
      const newCategory = res.data;
      dispatch({
        type: CREATE_CATEGORIES_SUCCESS,
        payload: newCategory,
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
      type: CREATE_CATEGORIES_FAILURE,
      payload: errorMessage,
    });
  }
};
