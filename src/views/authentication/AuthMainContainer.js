import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

// material-ui
import { Grid, Link } from "@mui/material";

// project import
import Logo from "@components/common/imagesvg";
import LogoInDark from "@assets/images/logo-workspace-dark.svg";
import LogoInLight from "@assets/images/logo-workspace-light.svg";

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthMainContainer = ({ children, ...other }) => {
  const customization = useSelector((state) => state.customization);

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item sx={{ mb: 3 }}>
          <Link to="#">
            <Logo
              src={customization.mode === "dark" ? LogoInDark : LogoInLight}
            />
          </Link>
        </Grid>
        {children}
      </Grid>
    </GoogleOAuthProvider>
  );
};

AuthMainContainer.propTypes = {
  children: PropTypes.node,
};

export default AuthMainContainer;
