import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers/index.js";
import thunk from "redux-thunk";

const { logger } = require(`redux-logger`);

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
