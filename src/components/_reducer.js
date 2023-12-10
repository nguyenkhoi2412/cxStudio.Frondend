//* shared
import muiBackdropSpinReducer from "./mui-ui/backdropSpin/backdropSpin.reducer";
import muiProgressBarReducer from "./mui-ui/progressBar/progressBar.reducer";
import muiSnackBarReducer from "./mui-ui/snackBar/snackBar.reducer";
import muiDrawerReducer from "./mui-ui/drawer/drawer.reducer";

export const componentReducer = {
  //? shared mui-ui
  muiBackdropSpin: muiBackdropSpinReducer,
  muiProgressBar: muiProgressBarReducer,
  muiSnackBar: muiSnackBarReducer,
  muiDrawer: muiDrawerReducer,
};

// export default componentReducer;
