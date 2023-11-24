import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./_rootReducer";
import thunk from "redux-thunk";
import customMiddleware from "./middleWare/customMiddleware ";

export default configureStore({
  reducer: rootReducer,
  middleware: [thunk, customMiddleware],
  devTools: process.env.NODE_ENV !== "production",
});

// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "@providers/reducers";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const configureStore = (initialState = {}) => {
//   return createStore(
//     rootReducer,
//     initialState,
//     composeEnhancers(applyMiddleware(thunk))
//   );
// };
// export default configureStore;
