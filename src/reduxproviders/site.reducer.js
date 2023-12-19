import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import SiteService from "@services/site";
import initialData from "./_initialState";

// ==============================|| ACTIONS ||============================== //
//#region ACTIONS
export const SITE_GET_BY_ID = createAsyncThunk(
  "site/getbyid",
  async (params, thunkAPI) => {
    return await SiteService.getbyid("site/getbyid/", params);
  }
);

// ==============================|| REDUX PROVIDER ||============================== //
//#region REDUX PROVIDER
// init state auth
const initialState = {
  ...initialData,
};

export const site = createSlice({
  name: "site",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    //#region SITE_GET_BY_ID
    [SITE_GET_BY_ID.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
        showProgressbar: true,
      };
    },
    [SITE_GET_BY_ID.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
        showProgressbar: false,
      };
    },
    [SITE_GET_BY_ID.fulfilled]: (state, action) => {
      const response = action.payload;
      const results = response?.rs;

      return {
        ...state,
        isFetching: false,
        showProgressbar: false,
        ok: response?.ok,
        message: response?.message,
        d: results,
      };
    },
    //#endregion
  },
});
//#endregion

// export actions to use
export const {} = site.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const siteState = (state) => state.site;
//#endregion

export default site.reducer;
