import { combineReducers } from "redux";
// //* shared
// import gSharedReducer from "./utils/shared.reducer";
import { componentReducer } from "@components/_reducer";
import customizationReducer from "./berry/customizationReducer";
import countryReducer from "./country.reducer";
import fileReducer from "./file.reducer";

// //* dashboard
import authReducer from "./auth.reducer";
import roleReducer from "./role.reducer";
// import secure_2faReducer from "./secure_2fa.reducer";
import siteReducer from "./site.reducer";
// import typeReducer from "./type.reducer";
// import supplierReducer from "./supplier.reducer";
// import categoryReducer from "./category.reducer";
// import articleReducer from "./article.reducer";
// import surveyReducer from "./survey.reducer";
// import questionReducer from "./question.reducer";

const rootReducer = combineReducers({
  //? shared
  ...componentReducer,
  customization: customizationReducer,
  //   gShared: gSharedReducer,
  country: countryReducer,
  file: fileReducer,
  //   //? dashboard
  auth: authReducer,
  role: roleReducer,
  //   secure_2fa: secure_2faReducer,
  site: siteReducer,
  //   type: typeReducer,
  //   supplier: supplierReducer,
  //   category: categoryReducer,
  //   article: articleReducer,
  //   survey: surveyReducer,
  //   question: questionReducer,
});

export default rootReducer;
