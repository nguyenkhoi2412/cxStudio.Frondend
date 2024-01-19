import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { WorkspaceService } from "@services/workspace";
import { array } from "@utils/crossCutting";
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
    return await WorkspaceService.insertnew("workspace/insertnew/", params);
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
  extraReducers: (builder) => {
    //#region INSERT_NEW
    builder
      .addCase(INSERT_NEW.pending, (state) => {
        return {
          ...state,
          isFetching: true,
          showProgressbar: true,
        };
      })
      .addCase(INSERT_NEW.rejected, (state) => {
        return {
          ...state,
          isFetching: false,
          showProgressbar: false,
        };
      })
      .addCase(INSERT_NEW.fulfilled, (state, { payload }) => {
        let results = payload?.rs;
        let data = [...current(state).d];
        data = data.push(results);

        return {
          ...state,
          isFetching: false,
          showProgressbar: false,
          ok: payload?.ok,
          message: payload?.message,
          originalData: data,
          data: data,
        };
      });
    //#endregion
    //#region WORKSPACE_GET_BY_USER
    builder
      .addCase(WORKSPACE_GET_BY_USER.pending, (state) => {
        return {
          ...state,
          isFetching: true,
          showProgressbar: true,
        };
      })
      .addCase(WORKSPACE_GET_BY_USER.rejected, (state) => {
        return {
          ...state,
          isFetching: false,
          showProgressbar: false,
        };
      })
      .addCase(WORKSPACE_GET_BY_USER.fulfilled, (state, { payload }) => {
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
export const {} = workspace.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const workspaceState = (state) => state.workspace;
//#endregion

export default workspace.reducer;
