import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { ButtonBase } from "@mui/material";

// project imports
import config from "configSettings";
import Logo from "@components/common/imagesvg";
import LogoInDark from "@assets/images/logo-workspace-dark.svg";
import LogoInLight from "@assets/images/logo-workspace-light.svg";
import { MENU_OPEN } from "@reduxproviders/berry/actions";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      component={Link}
      to={config.defaultPath}
    >
      <Logo src={customization.mode === "dark" ? LogoInDark : LogoInLight} />
    </ButtonBase>
  );
};

export default LogoSection;
