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

const customizationReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id],
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened,
      };
    case actionTypes.SET_MODE:
      localStorage.setItem("themeMode", action.mode);
      return {
        ...state,
        mode: action.mode,
      };
    case actionTypes.SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.fontFamily,
      };
    case actionTypes.SET_BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.borderRadius,
      };
    default:
      return state;
  }
};

export default customizationReducer;
