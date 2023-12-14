import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import fileServices from "@services/file";
import initialData from "./_initialState";

export const CHANGE_PROFILE_IMAGE = createAsyncThunk(
  "change_profile_gravatar",
  async (params, thunkAPI) => {
    return await fileServices.fileUpload(params);
  }
);

export const UPLOAD_FILE = createAsyncThunk(
  "file/upload",
  async (params, thunkAPI) => {
    return await fileServices.fileUpload(params);
  }
);

// init state role
const initialState = {
  ...initialData,
};

export const file = createSlice({
  name: "file",
  initialState: initialState,
  reducers: {},
  extraReducers: {},
});

// export actions to use
export const {} = file.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const fileState = (state) => state.file;
//#endregion

export default file.reducer;
