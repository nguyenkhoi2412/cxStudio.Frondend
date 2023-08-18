import { createSlice, current } from "@reduxjs/toolkit";

// init state
const initialState = {
  browser: {
    isRefresh: false,
  },
};

export const navigation = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    //* WINDOW.PERFORMANCE: performance.navigation.type == 1 => IS REFRESH
    DETECT_BROWSER_NAVIGATION: (state, action) => {
      const tempState = current(state);
      let browserIsRefresh = false;

      if (window.performance) {
        // // type = 1: REFRESH PAGE
        // if (performance.navigation.type == 1) {
        //   console.log("This page is reloaded");
        // } else {
        //   // NEW PAGE
        //   console.log("This page is not reloaded");
        // }
        browserIsRefresh = performance.navigation.type == 1;
      }

      return {
        ...tempState,
        browser: {
          isRefresh: browserIsRefresh,
        },
      };
    },
  },
});

// export actions to use
export const { DETECT_BROWSER_NAVIGATION } = navigation.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const browserState = (state) => state.navigation.browser;
//#endregion

export default navigation.reducer;
