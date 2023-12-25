import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import baseServices from "@services/_base.api";
import authServices from "@services/auth";
import { cookie, savedLocal } from "@utils/crossCutting";
import storageHandler from "@constants/storageHandler";

// ==============================|| ACTIONS ||============================== //
//#region ACTIONS
export const FIND_BY_USER = createAsyncThunk(
  "auth/findbyuser",
  async (params, thunkAPI) => {
    return await authServices.findByUser(params);
  }
);

export const VALIDATE_USER = createAsyncThunk(
  "auth/validate",
  async (params, thunkAPI) => {
    return await authServices.validateUser(params);
  }
);

export const REGISTER_USER = createAsyncThunk(
  "auth/register",
  async (params, thunkAPI) => {
    return await authServices.registerUser(params);
  }
);

export const RECOVERY_PASSWORD = createAsyncThunk(
  "auth/recoverypassword",
  async (params, thunkAPI) => {
    return await authServices.recoveryPassword(params);
  }
);

export const CHANGE_PASSWORD = createAsyncThunk(
  "auth/changepassword",
  async (params, thunkAPI) => {
    return await authServices.changePassword(params);
  }
);

export const VALIDATE_SECURE_2FA = createAsyncThunk(
  "auth/secure_2fa/validate",
  async (params, thunkAPI) => {
    return await authServices.verified_2fa(params);
  }
);

export const SECURE_2FA_GENERATE_TOKEN = createAsyncThunk(
  "auth/secure_2fa/gettoken",
  async (params, thunkAPI) => {
    return await authServices.getToken_2fa(params);
  }
);

export const USER_UPDATE_INFO = createAsyncThunk(
  "user/updateinfo",
  async (params, thunkAPI) => {
    return await baseServices.update("user/update", params);
  }
);

export const SIGNIN_SOCIAL_GOOGLE = createAsyncThunk(
  "auth/social/google",
  async (params, thunkAPI) => {
    return await authServices.signInGoogle(params);
  }
);
//#endregion

const currentUser = () => {
  if (savedLocal.get(storageHandler.AUTH.CURRENT_USER) !== undefined) {
    return savedLocal.get(storageHandler.AUTH.CURRENT_USER);
  }

  return {
    isAdmin: false,
    isSupervisor: false,
    isUser: false,
    isVisitor: true,
  };
};

// ==============================|| REDUX PROVIDER ||============================== //
//#region REDUX PROVIDER
// init state auth
const initialState = {
  isFetching: false,
  showProgressbar: false,
  ok: true,
  message: "",
  currentUser: currentUser(),
  language: "en",
};

export const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    SIGN_OUT: (state) => {
      savedLocal.del(storageHandler.AUTH.CURRENT_USER);
      cookie.del(storageHandler.AUTH.ACCESS_TOKEN);
      cookie.del(storageHandler.AUTH.REFRESH_TOKEN);
      cookie.del(storageHandler.AUTH.VERIFIED_2FA);

      return { ...state, ...initialState };
    },
  },
  extraReducers: (builder) => {
    //#region VALIDATE_USER
    builder
      .addCase(VALIDATE_USER.pending, (state) => {
        return {
          ...state,
          isFetching: true,
          showProgressbar: true,
        };
      })
      .addCase(VALIDATE_USER.rejected, (state) => {
        return {
          ...state,
          isFetching: false,
          showProgressbar: false,
        };
      })
      .addCase(VALIDATE_USER.fulfilled, (state, { payload }) => {
        const results = payload?.rs;
        const newState = {
          ...state,
          isFetching: false,
          showProgressbar: false,
          ok: payload?.ok,
          message: payload?.message,
          currentUser: {
            ...results.currentUser,
            isAdmin: results?.currentUser?.isAdmin,
            isSupervisor: results?.currentUser?.isSupervisor,
            isUser: results?.currentUser?.isUser,
            isVisitor: results?.currentUser?.isVisitor,
          },
        };

        if (payload?.ok) {
          // save localStore USER INFOS
          savedLocal.set(
            storageHandler.AUTH.CURRENT_USER,
            JSON.stringify(newState.currentUser)
          );

          // save token to cookie
          cookie.set(
            storageHandler.AUTH.VERIFIED_2FA,
            results.verified_token + ""
          );

          cookie.set(storageHandler.AUTH.ACCESS_TOKEN, results.access_token);

          // cookie.set(
          //   storageHandler.AUTH.REFRESH_TOKEN,
          //   results.refresh_token
          // );
        }

        return newState;
      });
    //#endregion
    //#region USER_UPDATE_INFO
    builder
      .addCase(USER_UPDATE_INFO.pending, (state) => {
        return {
          ...state,
          isFetching: true,
          showProgressbar: true,
        };
      })
      .addCase(USER_UPDATE_INFO.rejected, (state) => {
        return {
          ...state,
          isFetching: false,
          showProgressbar: false,
        };
      })
      .addCase(USER_UPDATE_INFO.fulfilled, (state, action) => {
        const response = action.payload;
        const results = response?.rs;

        if (results) {
          const newState = {
            ...state,
            isFetching: false,
            showProgressbar: false,
            ok: response?.ok,
            message: response?.message,
            currentUser: {
              ...results[0],
              isAdmin: results?.currentUser?.isAdmin,
              isSupervisor: results?.currentUser?.isSupervisor,
              isUser: results?.currentUser?.isUser,
              isVisitor: results?.currentUser?.isVisitor,
            },
          };

          if (response?.ok) {
            // save localStore USER INFOS
            savedLocal.set(
              storageHandler.AUTH.CURRENT_USER,
              JSON.stringify(newState.currentUser)
            );
          }
          return newState;
        }

        return {
          ...state,
          isFetching: false,
        };
      });
    //#endregion
    //#region VALIDATE_SECURE_2FA
    builder
      .addCase(VALIDATE_SECURE_2FA.pending, (state) => {
        return {
          ...state,
          isFetching: true,
          showProgressbar: true,
        };
      })
      .addCase(VALIDATE_SECURE_2FA.rejected, (state) => {
        return {
          ...state,
          isFetching: false,
          showProgressbar: false,
        };
      })
      .addCase(VALIDATE_SECURE_2FA.fulfilled, (state, { payload }) => {
        const results = payload?.rs;

        if (payload?.ok) {
          // save token to cookie
          cookie.set(
            storageHandler.AUTH.VERIFIED_2FA,
            results.verified_token + ""
          );

          cookie.set(storageHandler.AUTH.ACCESS_TOKEN, results.access_token);
        }

        return {
          ...state,
          isFetching: false,
          showProgressbar: false,
        };
      });
    //#endregion
    //#region SIGNIN_SOCIAL_GOOGLE
    builder
      .addCase(SIGNIN_SOCIAL_GOOGLE.pending, (state) => {
        return {
          ...state,
          isFetching: true,
          showProgressbar: true,
        };
      })
      .addCase(SIGNIN_SOCIAL_GOOGLE.rejected, (state) => {
        return {
          ...state,
          isFetching: false,
          showProgressbar: false,
        };
      })
      .addCase(SIGNIN_SOCIAL_GOOGLE.fulfilled, (state, { payload }) => {
        const results = payload?.rs;
        const newState = {
          ...state,
          isFetching: false,
          showProgressbar: false,
          ok: payload?.ok,
          message: payload?.message,
          currentUser: {
            ...results.currentUser,
            isAdmin: results?.currentUser?.isAdmin,
            isSupervisor: results?.currentUser?.isSupervisor,
            isUser: results?.currentUser?.isUser,
            isVisitor: results?.currentUser?.isVisitor,
          },
        };

        if (payload?.ok) {
          // save localStore USER INFOS
          savedLocal.set(
            storageHandler.AUTH.CURRENT_USER,
            JSON.stringify(newState.currentUser)
          );

          // save token to cookie
          cookie.set(
            storageHandler.AUTH.VERIFIED_2FA,
            results.verified_token + ""
          );

          cookie.set(storageHandler.AUTH.ACCESS_TOKEN, results.access_token);

          // cookie.set(
          //   storageHandler.AUTH.REFRESH_TOKEN,
          //   results.refresh_token
          // );
        }

        return newState;
      });
    //#endregion
  },
});
//#endregion

// export actions to use
export const { SIGN_OUT } = auth.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const authState = (state) => state.auth;
export const currentUserState = (state) => state.auth.currentUser;
export const isAdminState = (state) => state.auth.currentUser.isAdmin;
export const isSupervisorState = (state) => state.auth.currentUser.isSupervisor;
export const isUserState = (state) => state.auth.currentUser.isUser;
export const isVisitorState = (state) => state.auth.currentUser.isVisitor;
//#endregion

export default auth.reducer;
