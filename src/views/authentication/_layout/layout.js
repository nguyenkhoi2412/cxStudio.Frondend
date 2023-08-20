import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

//#region mui-ui
import { styled, useTheme } from "@mui/material/styles";
import { AppBar, Grid, Toolbar, useMediaQuery } from "@mui/material";
//#endregion

//#region components
import AuthWrapper from "../authWrapper";
import Leftbar from "./leftbar";
//#endregion

const AuthLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  //   sx={{ display: { xs: "block", md: "none" } }}
  return (
    <AuthWrapper>
      <Grid
        item
        md={6}
        lg={7}
        sx={{
          display: { xs: "none", md: "block", lg: "block" },
        }}
      >
        <Leftbar />
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <Outlet />
      </Grid>
    </AuthWrapper>
  );
};

export default AuthLayout;
