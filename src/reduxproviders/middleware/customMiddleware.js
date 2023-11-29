const customMiddleware = (store) => (next) => (action) => {
  // console.log("middleware ", store.getState());
  // console.log(action);
  // let data = action.payload;
  // console.log('data', data);
  next(action);
};

export default customMiddleware;
