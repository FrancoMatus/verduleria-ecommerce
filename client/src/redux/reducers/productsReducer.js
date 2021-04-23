import {
  GET_ALL_PRODUCTS_START,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  ADD_PRODUCT_TO_CART,
} from "../types";

const initialState = {
  allProducts: [],
  errorMessage: "",
  cart: [],
};

export default function productsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case GET_ALL_PRODUCTS_START:
      return {
        ...state,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: payload,
      };
    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };
    case CREATE_PRODUCT_START:
      return {
        ...state,
      };
    case CREATE_PRODUCT_SUCCESS: {
      const { allProducts: stateProducts } = state;
      const newStateProducts = stateProducts.concat(payload);
      return {
        ...state,
        allProducts: newStateProducts,
      };
    }
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };
    case ADD_PRODUCT_TO_CART: {
      const newStateCart = payload;
      return {
        ...state,
        cart: newStateCart,
      };
    }
    default:
      return state;
  }
}
