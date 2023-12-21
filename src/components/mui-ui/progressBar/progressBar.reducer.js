import { createSlice, current } from "@reduxjs/toolkit";

// init state
const initialState = {
  open: false,
};

export const muiProgressBar = createSlice({
  name: "muiProgressBar",
  initialState: initialState,
  reducers: {
    SHOW_PROGRESSBAR: (state) => {
      return {
        open: true,
      };
    },
    HIDE_PROGRESSBAR: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// export actions to use
export const { SHOW_PROGRESSBAR, HIDE_PROGRESSBAR } = muiProgressBar.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const progressBarState = (state) => state.muiProgressBar;
//#endregion

export default muiProgressBar.reducer;
