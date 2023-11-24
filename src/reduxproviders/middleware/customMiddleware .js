const customMiddleware = (store) => (next) => (action) => {
//   console.log("middleware ", store.getState());
//   console.log(action);
//   let data = action.payload;
  next(action);
};

export default customMiddleware;
