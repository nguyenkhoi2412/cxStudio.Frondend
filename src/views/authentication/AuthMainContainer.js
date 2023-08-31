import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// material-ui
import { Grid, Link } from "@mui/material";

// project import
import Logo from "@components/ui/imagesvg";
import LogoInDark from "@assets/images/logo-culture-comminity-dark.svg";
import LogoInLight from "@assets/images/logo-culture-comminity-light.svg";

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthMainContainer = ({ children, ...other }) => {
  const customization = useSelector((state) => state.customization);

  return (
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
  );
};

AuthMainContainer.propTypes = {
  children: PropTypes.node,
};

export default AuthMainContainer;
