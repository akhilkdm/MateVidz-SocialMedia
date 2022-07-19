import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";

import userReducer from "./Slices/userdata";

const persistConfig = { key: "root", storage };

const reducer = combineReducers({
  userData: userReducer,
});

const persistReduce = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistReduce,
});

export default store;
