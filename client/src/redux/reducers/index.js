import productsReducer from "./productsReducer";
import categoryReducer from "./categoryReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoryReducer,
  users: userReducer,
});

export default rootReducer;
