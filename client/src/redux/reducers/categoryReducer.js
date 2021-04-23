import {
  GET_ALL_CATEGORIES_START,
  GET_ALL_CATEGORIES_FAILURE,
  GET_ALL_CATEGORIES_SUCCESS,
  CREATE_CATEGORIES_START,
  CREATE_CATEGORIES_SUCCESS,
  CREATE_CATEGORIES_FAILURE,
} from "../types";
const initialState = {
  allCategories: [],
  errorMessage: "",
};

export default function categoryReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case GET_ALL_CATEGORIES_START:
      return {
        ...state,
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        allCategories: payload,
      };
    case GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };
    case CREATE_CATEGORIES_START:
      return {
        ...state,
      };
    case CREATE_CATEGORIES_SUCCESS: {
      const { allCategories: stateCategories } = state;
      const newStateCategories = stateCategories.concat(payload);
      return {
        ...state,
        allCategories: newStateCategories,
      };
    }
    case CREATE_CATEGORIES_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };
    default:
      return state;
  }
}
