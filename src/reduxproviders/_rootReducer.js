import { combineReducers } from "redux";
// //* shared
// import gSharedReducer from "./utils/shared.reducer";
import { componentReducer } from "@components/_reducer";

// //* dashboard
import userReducer from "./user.reducer";
import roleReducer from "./role.reducer";
// import secure_2faReducer from "./secure_2fa.reducer";
// import siteReducer from "./site.reducer";
// import typeReducer from "./type.reducer";
// import supplierReducer from "./supplier.reducer";
// import categoryReducer from "./category.reducer";
// import articleReducer from "./article.reducer";
// import surveyReducer from "./survey.reducer";
// import questionReducer from "./question.reducer";

const rootReducer = combineReducers({
  //? shared
  ...componentReducer,
  //   gShared: gSharedReducer,
  //   //? dashboard
  user: userReducer,
  role: roleReducer,
  //   secure_2fa: secure_2faReducer,
  //   site: siteReducer,
  //   type: typeReducer,
  //   supplier: supplierReducer,
  //   category: categoryReducer,
  //   article: articleReducer,
  //   survey: surveyReducer,
  //   question: questionReducer,
});

export default rootReducer;
