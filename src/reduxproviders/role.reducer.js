import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import baseServices from "@services/base.api";
import { storedExtension } from "@utils/helpersExtension";
import storageHandler from "@constants//storageHandler";
import _initialState from "@reduxproviders/_initialState";

export const ROLE_GET_ALL = createAsyncThunk(
  "role/getAll",
  async (params, thunkAPI) => {
    return await baseServices.getbyfilter("role/getAll/", params);
  }
);

// init state role
const initialState = {
  ..._initialState,
  d: [],
};

export const role = createSlice({
  name: "role",
  initialState: initialState,
  reducers: {},
  extraReducers: {},
});

// export actions to use
export const {} = role.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const roleState = (state) => state.role;
//#endregion

export default role.reducer;
