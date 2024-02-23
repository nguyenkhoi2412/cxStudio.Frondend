import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./_rootReducer";
// import { thunk } from "redux-thunk";
import pendingRequestMiddleware from "./middleware/pendingRequestMiddleware";

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([pendingRequestMiddleware]),
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
