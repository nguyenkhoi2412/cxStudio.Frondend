import PropTypes from "prop-types";
import { navigateLocation } from "@routes/navigateLocation";

//#region reducer
import { useSelector } from "react-redux";
//#endregion
// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Drawer, useMediaQuery } from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";

// project imports
import MenuList from "./menuList";
import LogoSection from "@clientapp/community/_layout/logoSection";
import MenuCard from "./menuCard";
import { drawerWidth } from "@constants";
// ==============================|| SIDEBAR DRAWER ||============================== //

const getUserList = (users) => {
  let childs = users?.map((u) => {
    return {
      id: u.socketId,
      title: u.currentUser.detailInfos.aliasName,
      avatar: u.currentUser.detailInfos.avatarPath,
      type: "item",
    };
  });

  let userlist = {
    items: [
      {
        id: "livechat",
        title: "Live chat",
        caption: "Active users",
        type: "group",
        children: childs,
      },
    ],
  };
  return userlist;
};

const Chatbar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [users, setUsers] = React.useState([]);
  const socket = useSelector(
    (state) => state.customization.configSettings.socket
  );

  //#region useHooks
  React.useEffect(() => {
    socket.on("liveChat__joinResponse", (data) => setUsers(data));
  }, [socket, users]);
  //#endregion

  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <MenuList navItems={getUserList(users)} />
          {/* chatbox */}
          {/* <MenuCard /> */}
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList navItems={getUserList(users)} />
          {/* <MenuCard /> */}
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: "none",
            [theme.breakpoints.up("md")]: {
              top: "88px",
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Chatbar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Chatbar;
