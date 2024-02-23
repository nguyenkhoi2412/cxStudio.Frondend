import {
  SHOW_PROGRESSBAR,
  HIDE_PROGRESSBAR,
} from "@components/mui-ui/progressBar/progressBar.reducer";

let saveUrlShowProgresBar = [];

const pendingRequestMiddleware = (store) => (next) => (action) => {
  // const state = store.getState();
  // const { dispatch } = store;
  // const requestStatus = action?.meta?.requestStatus;
  // console.log("action", state);

  // var statusReq = {
  //   pending: () => {
  //     Object.values(state).reduce(function (r, obj) {
  //       console.log('============================', obj);
  //       Object.getOwnPropertyNames(obj).map(function (key) {
  //         console.log('showProgressbar', key);
  //         console.log('showProgressbar', key === "showProgressbar");
  //         console.log('sdfsdfsfsf', obj[key]);
  //         if (key === "showProgressbar" && obj[key] === true) {
            
  //           saveUrlShowProgresBar.push(req.url);
  //           return;
  //         }
  //       });
  //     });

  //     if (saveUrlShowProgresBar?.length > 0) {
  //       dispatch(SHOW_PROGRESSBAR());
  //     }
  //   },
  //   // rejected: () => {
  //   //   dispatch(HIDE_PROGRESSBAR());
  //   // },
  //   fulfilled: () => {
  //     dispatch(HIDE_PROGRESSBAR());
  //   },
  //   default: () => {},
  // };

  // statusReq[requestStatus || "default"]();
  next(action);
};

export default pendingRequestMiddleware;
