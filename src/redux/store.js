import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import articleReducer from "./reducers/articleReducer";

const reducer = combineReducers({
  article: articleReducer,
});

const middleware = [thunkMiddleware, logger];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
