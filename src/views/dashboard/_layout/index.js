// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { AppBar, Box, Toolbar, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// project imports
import Breadcrumbs from "@components/mui-ui/extended/breadcrumbs";
import Header from "./header";
import Sidebar from "./sidebar";
import Customization from "./customization";
import menuSidebar from "@dashboard/components/menuSidebar";
import { drawerWidth } from "@constants";
import { SET_MENU } from "@reduxproviders/berry/actions";

// assets
import { IconChevronRight } from "@tabler/icons-react";

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
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
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

const LayoutDashboard = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  console.log(theme);
  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened
            ? theme.transitions.create("width")
            : "none",
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>
      {/* drawer */}
      <Sidebar
        drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />
      {/* main content */}
      <Main className="wrapper-content" theme={theme} open={leftDrawerOpened}>
        {/* breadcrumb */}
        <Breadcrumbs
          separator={IconChevronRight}
          navigation={menuSidebar}
          icon
          title
          rightAlign
        />
        <Outlet />
      </Main>
      <Customization />
    </Box>
  );
};

export default LayoutDashboard;
