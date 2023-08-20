import "./_leftbar.scss";
import PropTypes from "prop-types";
import BgCommunity from "@assets/images/bg_community.svg";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Drawer, useMediaQuery } from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";

// project imports
import { drawerWidth } from "@constants";
import BackgroundImage from "@components/ui/imagesvg";

// ==============================|| SIDEBAR DRAWER ||============================== //

const Leftbar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 2,
        mx: "auto",
        flexShrink: { md: 0 },
        width: matchUpMd ? drawerWidth : "auto",
      }}
      className="sidebar"
    >
      <BackgroundImage className="bg-img" src={BgCommunity} />
    </Box>
  );
};

Leftbar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Leftbar;
