import { createSlice, current } from "@reduxjs/toolkit";

// init state
const initialState = {
  className: "",
  title: "",
  open: false,
  anchor: "right", // left, right, bottom, top
  width: 280,
  height: 280,
};

export const muiDrawer = createSlice({
  name: "muiDrawer",
  initialState: initialState,
  reducers: {
    OPEN_DRAWER: (state, action) => {
      const payload = action.payload;
      return {
        ...state,
        open: true,
        className: payload?.className || state.className,
        title: payload?.title || state.title,
        anchor: payload?.anchor || state.anchor,
        width: payload?.width || state.width,
        height: payload?.height || state.height,
      };
    },
    CLOSE_DRAWER: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// export actions to use
export const { OPEN_DRAWER, CLOSE_DRAWER } = muiDrawer.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const drawerState = (state) => state.muiDrawer;
//#endregion

export default muiDrawer.reducer;
