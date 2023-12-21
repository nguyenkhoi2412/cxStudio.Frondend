import { createSlice } from "@reduxjs/toolkit";

// init state
const initialState = {
  open: false,
  autoHideDuration: 3000,
  severity: "success", // success/error/info/warning
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
};

export const muiSnackBar = createSlice({
  name: "muiSnackBar",
  initialState: initialState,
  reducers: {
    SHOW_SNACKBAR: (state, { payload }) => {
      return {
        ...state,
        open: true,
        autoHideDuration: payload?.autoHideDuration || state.autoHideDuration,
        severity: payload?.severity || state.severity,
        content: payload?.content || state.content,
        anchorOrigin: payload?.anchorOrigin || state.anchorOrigin,
      };
    },
    HIDE_SNACKBAR: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// export actions to use
export const { SHOW_SNACKBAR, HIDE_SNACKBAR } = muiSnackBar.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const snackBarState = (state) => state.muiSnackBar;
//#endregion

export default muiSnackBar.reducer;
