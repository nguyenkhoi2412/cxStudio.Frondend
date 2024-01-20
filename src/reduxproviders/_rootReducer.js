import { combineReducers } from "redux";
// //* shared
// import gSharedReducer from "./utils/shared.reducer";
import navigationReducer from "./utils/navigation.reducer";
import { componentReducer } from "@components/_reducer";
import customizationReducer from "./berry/customization.reducer";
// import countryReducer from "./country.reducer";
// import fileReducer from "./file.reducer";

//* dashboard
import authReducer from "./auth.reducer";
import sessionHandlerReducer from "./sessionHandler.reducer";
// import roleReducer from "./role.reducer";
// // import secure_2faReducer from "./secure_2fa.reducer";
import siteReducer from "./site.reducer";
import workspaceReducer from "./workspace.reducer";
import industryReducer from "./industry.reducer";

const rootReducer = combineReducers({
  //? shared
  ...componentReducer,
  customization: customizationReducer,
  navigation: navigationReducer,
  // //   gShared: gSharedReducer,
  // country: countryReducer,
  // file: fileReducer,
  // //   //? dashboard
  auth: authReducer,
  sessionHandler: sessionHandlerReducer,
  // role: roleReducer,
  // //   secure_2fa: secure_2faReducer,
  site: siteReducer,
  workspace: workspaceReducer,
  industry: industryReducer,
});

export default rootReducer;
