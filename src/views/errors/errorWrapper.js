import "./_error.scss";

// material-ui
import { styled } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import bgAuth from "@assets/images/auth/bg-auth-behind.svg";

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const ErrorWrapperContainer = styled("div")(({ theme }) => ({
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

const ErrorWrapper = ({ children, ...other }) => (
  <ErrorWrapperContainer>
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{ minHeight: "100vh" }}
      className="wrapper error-pages"
    >
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "calc(100vh - 68px)" }}
          className="page-not-found"
        >
          {children}
        </Grid>
      </Grid>
    </Grid>
  </ErrorWrapperContainer>
);

export default ErrorWrapper;
