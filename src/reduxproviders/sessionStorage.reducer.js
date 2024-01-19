import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import initialData from "./_initialState";
import { StorageService } from "@services/storage";

export const COOKIE_GET = createAsyncThunk(
  "cookie/getCookie",
  async (params, thunkAPI) => {
    return await StorageService.getCookie();
  }
);

// init state role
const initialState = {
  ...initialData,
};

export const sessionStorage = createSlice({
  name: "sessionStorage",
  initialState: initialState,
  reducers: {
    UPDATE_COOKIE: (state, { payload }) => {
      return {
        ...state,
        isFetching: false,
        showProgressbar: false,
        ok: payload?.ok,
        message: payload?.message,
        originalData: payload.rs,
        data: payload.rs,
      };
    },
  },
  extraReducers: (builder) => {
    //#region COOKIE_GET
    builder
      .addCase(COOKIE_GET.pending, (state) => {
        return {
          ...state,
          isFetching: true,
          showProgressbar: true,
        };
      })
      .addCase(COOKIE_GET.rejected, (state) => {
        return {
          ...state,
          isFetching: false,
          showProgressbar: false,
        };
      })
      .addCase(COOKIE_GET.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isFetching: false,
          showProgressbar: false,
          ok: payload?.ok,
          message: payload?.message,
          originalData: payload.rs,
          data: payload.rs,
        };
      });
    //#endregion
  },
});

// export actions to use
export const { UPDATE_COOKIE } = sessionStorage.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const storageState = (state) => state.sessionStorage;
//#endregion

export default sessionStorage.reducer;
