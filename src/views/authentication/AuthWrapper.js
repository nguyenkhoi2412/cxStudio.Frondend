import "./_auth.scss";

// material-ui
import { styled } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import bgAuth from "@assets/images/auth/bg-auth-behind.svg";

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapperContainer = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  // backgroundImage: "url(https://source.unsplash.com/random)",
  backgroundImage: (t) =>
    theme.palette.mode === "light" ? "url(" + bgAuth + ")" : "none",
  backgroundRepeat: "no-repeat",
  backgroundColor: (t) =>
    theme.palette.mode === "light" ? theme.palette.primary.light : "transparent",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const AuthWrapper = ({ children, ...other }) => (
  <AuthWrapperContainer>
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{ minHeight: "100vh" }}
      className="wrapper auth"
    >
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "calc(100vh - 68px)" }}
        >
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </AuthWrapperContainer>
);

export default AuthWrapper;
