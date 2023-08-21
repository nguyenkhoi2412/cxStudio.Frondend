// material-ui
import { styled } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import bgAuth from "@assets/images/auth/bg-auth-behind.svg";

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapperContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: "100vh",
  width: "100%",
  // backgroundImage: "url(https://source.unsplash.com/random)",
  backgroundImage: "url(" + bgAuth + ")",
  backgroundRepeat: "no-repeat",
  // backgroundColor: (t) =>
  //   theme.palette.mode === "light"
  //     ? theme.palette.grey[50]
  //     : theme.palette.grey[900],
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
          {children}
        </Grid>
      </Grid>
    </Grid>
  </AuthWrapperContainer>
);

export default AuthWrapper;
