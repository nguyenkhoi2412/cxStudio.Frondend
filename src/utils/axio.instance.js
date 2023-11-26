import axios from "axios";
import stored from "@constants/storageHandler";
import reduxStore from "@reduxproviders/_storeProvider";
import {
  SHOW_PROGRESSBAR,
  HIDE_PROGRESSBAR,
} from "@components/mui-ui/progressBar/progressBar.reducer";
import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
} from "@components/mui-ui/snackBar/snackBar.reducer";
import { storedExtension } from "./helpersExtension";
// You can use your own logic to set your local or production domain
const baseDomain = process.env.API_HOSTNAME;
const baseURL = `${baseDomain}/api`;
// const baseAPI_URL = "http://jsonplaceholder.typicode.com/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 300000, // 5min = 300000/1000/60
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
  // mode: "same-origin",
  // redirect: "follow",
  responseType: "json",
  // transformRequest: [
  //   (data, headers) => {
  //     // do something with data
  //     return data;
  //   },
  // ],
});

export default axiosInstance;

//#region interceptors
axiosInstance.interceptors.request.use(
  (request) => {
    // Do something before request is sent
    const accessToken = getLocalAccessToken();

    // show progressbar when request
    SPIN.SHOW_PROGRESSBAR(request);

    if (accessToken !== null && accessToken !== undefined) {
      request.headers["Authorization"] = "Bearer " + accessToken;
      // request.headers["X-Access-Token"] = "Bearer " + accessToken;
    }

    return request;
  },
  (requestError) => {
    console.log("requestError", responseError);
    return Promise.reject(requestError);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // hide progressbar when response complete
    SPIN.HIDE_PROGRESSBAR(response);

    // Return a successful response back to the calling service
    if (response && response.data) return response.data;

    return response;
  },
  (responseError) => {
    console.log("responseError", responseError);

    // show snackbar alert error
    // direct access to redux store.
    reduxStore.dispatch(
      SHOW_SNACKBAR({
        // variant could be success, error, warning, info, or default
        severity: "error",
        content: responseError.message,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      })
    );

    // 405: Method Not Allowed
    if (responseError.response?.status !== 405) {
      removeLocalToken();

      // Return any error which is not due to authentication back to the calling service
      if (responseError.response?.status !== 401) {
        return Promise.reject(responseError);
      }
      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      axios.interceptors.response.eject(axiosInstance);
      // const params = {
      //   refresh_token: getLocalRefreshToken(),
      // };

      // authServices.refreshToken(params).then((rs) => {
      //   let module = localStorage.getItem(CURRENT_MODULES());
      //   if (module !== null) {
      //     module = JSON.parse(module);
      //     module = {
      //       ...module,
      //       accessToken: rs.data.access_token,
      //     };
      //   }

      //  referedEvent(responseError.response);
      // });
    }
  }
);
//#endregion

//#region functions support for axios callback
const getLocalRefreshToken = () => {
  return storedExtension.getCookie(stored.AUTH.REFRESH_TOKEN);
};

const getLocalAccessToken = () => {
  return storedExtension.getCookie(stored.AUTH.ACCESS_TOKEN);
};

const removeLocalToken = () => {
  // const module = CURRENT_MODULES();
  // localStorage.removeItem(stored.AUTH.CURRENT_USER);
  // storedExtension.removeCookie(stored.AUTH.ACCESS_TOKEN);
  // storedExtension.removeCookie(stored.AUTH.REFRESH_TOKEN);
  // window.location.href = "/" + module + "/login";
};

const getShowProgressbar = (req, objectMulti) => {
  Object.values(objectMulti).reduce(function (r, obj) {
    Object.getOwnPropertyNames(obj).map(function (key) {
      if (key === "showProgressbar" && obj[key] === true) {
        urlShowProgresBar.push(req.url);
        return;
      }
    });
  });

  return urlShowProgresBar;
};

// ==============================|| SPIN ||============================== //
let urlShowProgresBar = [];
const SPIN = {
  SHOW_PROGRESSBAR: (req) => {
    // show progressbar when request
    const { dispatch } = reduxStore; // direct access to redux store.
    const stores = reduxStore.getState();

    Object.values(stores).reduce(function (r, obj) {
      Object.getOwnPropertyNames(obj).map(function (key) {
        if (key === "showProgressbar" && obj[key] === true) {
          urlShowProgresBar.push(req.url);
          return;
        }
      });
    });

    if (urlShowProgresBar?.length > 0) {
      dispatch(SHOW_PROGRESSBAR());
    }
  },
  HIDE_PROGRESSBAR: (res) => {
    const { dispatch } = reduxStore; // direct access to redux store.

    urlShowProgresBar = urlShowProgresBar.filter((x) => x !== res.config.url);
    if (urlShowProgresBar.length === 0) {
      dispatch(HIDE_PROGRESSBAR());
    }
  },
};

// const referedEvent = (res) => {
//   console.log(res);
//   const url = res.url;
//   const data = res.data;

//   switch (res.method) {
//     case "get":
//       axios.get(url, data);
//       break;

//     case "post":
//       break;
//   }
// };
//#endregion
