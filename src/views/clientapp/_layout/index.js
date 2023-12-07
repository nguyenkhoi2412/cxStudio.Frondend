import "./_layout.scss";
import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_MENU } from "@reduxproviders/berry/actions";
import { drawerWidth } from "@constants";
import APP from "@constants/app";

//#region MUI-UI
import { styled, useTheme } from "@mui/material/styles";
import { Container, AppBar, Box, Toolbar, useMediaQuery } from "@mui/material";
//#endregion

//#region Procjects import
import bgLight from "@assets/images/background-light.svg";
import bgDark from "@assets/images/background-dark.svg";
import Header from "./header";
import Sidebar from "./sidebar";
import Chatbar from "@chatbox/components/chatbar";
import Customization from "./customization";
//#endregion

//#region STYLE
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
        marginRight: "10px",
      },
    }),
    ...(open && {
      backgroundImage: `url(${
        theme.palette.mode === "light" ? bgLight : bgDark
      })`,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
      },
    }),
  })
);
//#endregion

const LayoutCommunity = ({ appName }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const [classWrapper, setClassWrapper] = React.useState("");

  //#region useHooks
  React.useEffect(() => {
    // set className for wrapper
    handleWrapperClassesApps(appName);
  }, [appName]);
  //#endregion

  //#region handle events
  const handleWrapperClassesApps = (appName) => {
    const comm = {
      [APP.COMMUNITY.CHATBOX]: () => {
        setClassWrapper(" chatbox");
      },
      [APP.LAUNDRY_SERVICE]: () => {
        setClassWrapper(" laundry-service");
      },
      ["default"]: () => {
        setClassWrapper("");
      },
    };

    return (comm[appName] || comm["default"])();
  };

  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const [navBarPosition, updateNavbarPosition] = React.useState(false);
  const scrollHandler = () => {
    if (window.scrollY >= 20) {
      updateNavbarPosition(true);
    } else {
      updateNavbarPosition(false);
    }
  };

  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  //#endregion

  //#region render content
  const renderSideBar = () => {
    const sidebar = {
      [APP.COMMUNITY.CHATBOX]: () => {
        return (
          <Chatbar
            drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
            drawerToggle={handleLeftDrawerToggle}
          />
        );
      },
      [APP.EMPTY]: () => {
        return <></>;
      },
      ["default"]: () => {
        return (
          <Sidebar
            drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
            drawerToggle={handleLeftDrawerToggle}
          />
        );
      },
    };

    return (sidebar[appName] || sidebar["default"])();
  };
  //#endregion

  return (
    <Box className={"wrapper" + classWrapper} sx={{ display: "flex" }}>
      {/* header */}
      <AppBar
        enableColorOnDark
        component="header"
        position="fixed"
        color="inherit"
        elevation={0}
        className={navBarPosition ? " sticky" : ""}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened
            ? theme.transitions.create("width")
            : "none",
        }}
      >
        <Toolbar>
          <Header
            appName={appName}
            handleLeftDrawerToggle={handleLeftDrawerToggle}
          />
        </Toolbar>
      </AppBar>
      {/* drawer */}
      {renderSideBar()}
      {/* main content */}
      <Main className="wrapper-content" theme={theme} open={leftDrawerOpened}>
        <Container maxWidth={false} disableGutters>
          <Outlet />
        </Container>
      </Main>
      <Customization />
    </Box>
  );
};

export default LayoutCommunity;
