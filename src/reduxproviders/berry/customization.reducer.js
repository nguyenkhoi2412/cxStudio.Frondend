import { createSlice } from "@reduxjs/toolkit";

// project imports
import configSettings from "configSettings";
// action - state management
import * as actionTypes from "./actions";

export const initialState = {
  isOpen: [], // for active default menu
  defaultId: "default",
  fontFamily: configSettings.fontFamily,
  borderRadius: configSettings.borderRadius,
  opened: true,
  mode: configSettings.mode,
  configSettings: {
    socket: configSettings.socket,
  },
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //
export const customization = createSlice({
  name: "customization",
  initialState: initialState,
  reducers: {
    CUSTOMIZATION: (state, { payload }) => {
      let id;

      var customizeType = {
        [actionTypes.MENU_OPEN]: () => {
          id = payload.id;
          return {
            ...state,
            isOpen: [id],
          };
        },
        [actionTypes.SET_MENU]: () => {
          return {
            ...state,
            opened: payload.opened,
          };
        },
        [actionTypes.SET_MODE]: () => {
          localStorage.setItem("themeMode", payload.mode);
          return {
            ...state,
            mode: payload.mode,
          };
        },
        [actionTypes.SET_FONT_FAMILY]: () => {
          return {
            ...state,
            fontFamily: payload.fontFamily,
          };
        },
        [actionTypes.SET_BORDER_RADIUS]: () => {
          return {
            ...state,
            borderRadius: payload.borderRadius,
          };
        },
        default: () => {
          return { ...state };
        },
      };

      return (customizeType[payload.type] || customizeType["default"])();
    },
  },
});

// export actions to use
export const { CUSTOMIZATION } = customization.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const customizationState = (state) => state.customization;
//#endregion

export default customization.reducer;
