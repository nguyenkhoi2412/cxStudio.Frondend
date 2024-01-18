import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { IndustryService } from "@services/industry";
import initialData from "./_initialState";

export const INDUSTRY_GET_ALL = createAsyncThunk(
  "industry/getall",
  async (params, thunkAPI) => {
    return await IndustryService.getAll();
  }
);

// init state role
const initialState = {
  ...initialData,
};

export const industry = createSlice({
  name: "industry",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#region INDUSTRY_GET_ALL
    builder
      .addCase(INDUSTRY_GET_ALL.pending, (state) => {
        return {
          ...state,
          isFetching: true,
          showProgressbar: true,
        };
      })
      .addCase(INDUSTRY_GET_ALL.rejected, (state) => {
        return {
          ...state,
          isFetching: false,
          showProgressbar: false,
        };
      })
      .addCase(INDUSTRY_GET_ALL.fulfilled, (state, { payload }) => {
        const results = payload?.rs;
        return {
          ...state,
          isFetching: false,
          showProgressbar: false,
          ok: payload?.ok,
          message: payload?.message,
          originalData: results,
          data: results,
        };
      });
    //#endregion
  },
});

// export actions to use
export const {} = industry.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const industryState = (state) => state.industry;
//#endregion

export default industry.reducer;
