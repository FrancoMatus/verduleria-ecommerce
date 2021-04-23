import {
  GET_ALL_PRODUCTS_START,
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_SUCCESS,
  ADD_PRODUCT_TO_CART,
} from "../types";
import { api } from "../../services/api";

export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: GET_ALL_PRODUCTS_START });
  try {
    const res = await api.get(`/api/products/all`);

    if (res.status === 200) {
      const allProducts = res.data;
      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: allProducts,
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
      type: GET_ALL_PRODUCTS_FAILURE,
      payload: errorMessage,
    });
  }
};

export const createProduct = (data) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_START });
  const token = JSON.parse(localStorage.getItem("userToken"));
  const headers = { "Content-Type": "application/json", "auth-token": token };

  try {
    const res = await api.post(`/api/products/create`, data, {
      headers,
    });

    if (res.status === 200) {
      const newProduct = res.data;
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: newProduct,
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
      type: CREATE_PRODUCT_FAILURE,
      payload: errorMessage,
    });
  }
};

export const createCart = (products) => (dispatch) => {
  dispatch({ type: ADD_PRODUCT_TO_CART, payload: products });
};
