import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import baseServices from "@services/_base.api";
import { WorkspaceService } from "@services/workspace";
import { arrayHelper } from "@utils/array.helper";
import initialData from "./_initialState";

export const WORKSPACE_GET_BY_USER = createAsyncThunk(
  "workspace/getbyuser",
  async (params, thunkAPI) => {
    return await WorkspaceService.getByUser(params);
  }
);

export const INSERT_NEW = createAsyncThunk(
  "workspace/insertnew",
  async (params, thunkAPI) => {
    return await baseServices.insertnew("workspace/insertnew/", params);
  }
);

// init state role
const initialState = {
  ...initialData,
};

export const workspace = createSlice({
  name: "workspace",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    //#region INSERT_NEW
    [INSERT_NEW.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
        showProgressbar: true,
      };
    },
    [INSERT_NEW.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
        showProgressbar: false,
      };
    },
    [INSERT_NEW.fulfilled]: (state, action) => {
      const response = action.payload;
      let results = response?.rs;
      let data = [...current(state).d];
      data = arrayHelper.insert(data, data.length, results);

      return {
        ...state,
        isFetching: false,
        showProgressbar: false,
        ok: response?.ok,
        message: response?.message,
        d: data,
      };
    },
    //#endregion
    //#region WORKSPACE_GET_BY_USER
    [WORKSPACE_GET_BY_USER.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
        showProgressbar: true,
      };
    },
    [WORKSPACE_GET_BY_USER.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
        showProgressbar: false,
      };
    },
    [WORKSPACE_GET_BY_USER.fulfilled]: (state, action) => {
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

// export actions to use
export const {} = workspace.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const workspaceState = (state) => state.workspace;
//#endregion

export default workspace.reducer;
