import { createSlice, current } from "@reduxjs/toolkit";

// init state
const initialState = {
  open: false,
  spin: false,
};

export const muiBackdropSpin = createSlice({
  name: "muiBackdropSpin",
  initialState: initialState,
  reducers: {
    SHOW_SPIN: (state, action) => {
      const payload = action.payload;
      return {
        ...current(state),
        type: payload?.type ?? "mui", // type: "pre"
        open: payload?.open !== undefined ? payload.open : true,
        spin: payload?.spin !== undefined ? payload.spin : true,
      };
    },
    HIDE_SPIN: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// export actions to use
export const { SHOW_SPIN, HIDE_SPIN } = muiBackdropSpin.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const backdropSpinState = (state) => state.muiBackdropSpin;
//#endregion

export default muiBackdropSpin.reducer;
