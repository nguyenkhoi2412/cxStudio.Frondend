import gVariables from "@stores/shared/variables";
import { arrayExtension } from "@utils/crossCutting";
import { HTTP_STATUS } from "@constants/httpStatus";
import { useSnackbar } from "notistack";
import severity from "@constants/severity";

export default {
  INITIAL_STATE: {
    isFetching: false,
    ok: true,
    message: "",
    action: "",
    d: [],
  },
  HANDLE_HTTP_STATUS: (response) => {
    // response: {
    //   code: statusCodes.OK/any,
    //   ok: true/false,
    //   message: "message here",
    //   rs: {data.here},
    // }
    const { enqueueSnackbar } = useSnackbar();
    const statusCode = [
      HTTP_STATUS.LOCKED,
      HTTP_STATUS.METHOD_NOT_ALLOWED,
      HTTP_STATUS.UNAUTHORIZED,
    ];

    return new Promise((resolve, reject) => {
      if (statusCode.filter((item) => item === response.code)) {
        enqueueSnackbar(response.message, {
          variant: severity.error,
        });
        reject();
      }

      resolve(response);
    });
  },
  // GET: (state, response, additionalData = {}) => {
  //   const tempState = {
  //     ...state,
  //     isFetching: false,
  //     ok: response.ok,
  //     message: response.message,
  //     action: gVariables.GET,
  //     d: response.rs,
  //   };

  //   return {
  //     ...tempState,
  //     ...additionalData,
  //   };
  // },
  // INSERT: (state, response, additionalData = {}) => {
  //   if (response === undefined) {
  //     return {
  //       ...state,
  //       isFetching: false,
  //       ok: false,
  //       message: "Method Not Allowed",
  //       action: gVariables.INSERT,
  //     };
  //   } else {
  //     const tempState = {
  //       ...state,
  //       isFetching: false,
  //       ok: response.ok,
  //       message: response.message,
  //       action: gVariables.INSERT,
  //       d: arrayExtension.insert(state.d, 0, response.rs[0]),
  //     };

  //     return {
  //       ...tempState,
  //       ...additionalData,
  //     };
  //   }
  // },
  // UPDATE: (state, response, additionalData = {}) => {
  //   if (response === undefined) {
  //     return {
  //       ...state,
  //       isFetching: false,
  //       ok: false,
  //       message: "Method Not Allowed",
  //       action: gVariables.UPDATE,
  //     };
  //   } else {
  //     const tempState = {
  //       ...state,
  //       isFetching: false,
  //       ok: response.ok,
  //       message: response.message,
  //       action: gVariables.UPDATE,
  //       d: arrayExtension.update(state.d, response.rs),
  //     };

  //     return {
  //       ...tempState,
  //       ...additionalData,
  //     };
  //   }
  // },
  // DELETE: (state, response, additionalData = {}) => {
  //   if (response === undefined) {
  //     return {
  //       ...state,
  //       isFetching: false,
  //       ok: false,
  //       message: "Method Not Allowed",
  //       action: gVariables.DELETE,
  //     };
  //   } else {
  //     const tempState = {
  //       ...state,
  //       isFetching: false,
  //       ok: response.ok,
  //       message: response.message,
  //       action: gVariables.DELETE,
  //       d: arrayExtension.delete(state.d, response.rs),
  //     };

  //     return {
  //       ...tempState,
  //       ...additionalData,
  //     };
  //   }
  // },
};

// export const HTTP_STATUS = {
//   CONTINUE: 100,
//   SWITCHING_PROTOCOLS: 101,
//   PROCESSING: 102,
//   EARLY_HINTS: 103,
//   OK: 200,
//   CREATED: 201,
//   ACCEPTED: 202,
//   NON_AUTHORITATIVE_INFORMATION: 203,
//   NO_CONTENT: 204,
//   RESET_CONTENT: 205,
//   PARTIAL_CONTENT: 206,
//   MULTI_STATUS: 207,
//   ALREADY_REPORTED: 208,
//   IM_USED: 226,
//   MULTIPLE_CHOICES: 300,
//   MOVED_PERMANENTLY: 301,
//   FOUND: 302,
//   SEE_OTHER: 303,
//   NOT_MODIFIED: 304,
//   USE_PROXY: 305,
//   TEMPORARY_REDIRECT: 307,
//   PERMANENT_REDIRECT: 308,
//   BAD_REQUEST: 400,
//   UNAUTHORIZED: 401,
//   PAYMENT_REQUIRED: 402,
//   FORBIDDEN: 403,
//   NOT_FOUND: 404,
//   METHOD_NOT_ALLOWED: 405,
//   NOT_ACCEPTABLE: 406,
//   PROXY_AUTHENTICATION_REQUIRED: 407,
//   REQUEST_TIMEOUT: 408,
//   CONFLICT: 409,
//   GONE: 410,
//   LENGTH_REQUIRED: 411,
//   PRECONDITION_FAILED: 412,
//   PAYLOAD_TOO_LARGE: 413,
//   URI_TOO_LONG: 414,
//   UNSUPPORTED_MEDIA_TYPE: 415,
//   RANGE_NOT_SATISFIABLE: 416,
//   EXPECTATION_FAILED: 417,
//   IM_A_TEAPOT: 418,
//   MISDIRECTED_REQUEST: 421,
//   UNPROCESSABLE_ENTITY: 422,
//   LOCKED: 423,
//   FAILED_DEPENDENCY: 424,
//   TOO_EARLY: 425,
//   UPGRADE_REQUIRED: 426,
//   PRECONDITION_REQUIRED: 428,
//   TOO_MANY_REQUESTS: 429,
//   REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
//   UNAVAILABLE_FOR_LEGAL_REASONS: 451,
//   INTERNAL_SERVER_ERROR: 500,
//   NOT_IMPLEMENTED: 501,
//   BAD_GATEWAY: 502,
//   SERVICE_UNAVAILABLE: 503,
//   GATEWAY_TIMEOUT: 504,
//   HTTP_VERSION_NOT_SUPPORTED: 505,
//   VARIANT_ALSO_NEGOTIATES: 506,
//   INSUFFICIENT_STORAGE: 507,
//   LOOP_DETECTED: 508,
//   BANDWIDTH_LIMIT_EXCEEDED: 509,
//   NOT_EXTENDED: 510,
//   NETWORK_AUTHENTICATION_REQUIRED: 511,
// };
