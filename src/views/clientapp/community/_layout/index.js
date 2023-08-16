import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

//#region MUI-UI
import { styled, useTheme } from "@mui/material/styles";
import { Container, AppBar, Box, Toolbar, useMediaQuery } from "@mui/material";
//#endregion

//#region Procjects import
import Header from "./header";
import Sidebar from "./sidebar";
//#endregion

const LayoutCommunity = () => {
  const theme = useTheme();

  // Handle left drawer
  const leftDrawerOpened = true;
  const [navBarPosition, updateNavbarPosition] = React.useState(false);
  const scrollHandler = () => {
    if (window.scrollY >= 20) {
      updateNavbarPosition(true);
    } else {
      updateNavbarPosition(false);
    }
  };

  return (
    <Box className="wrapper community" sx={{ display: "flex" }}>
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        className={navBarPosition ? " sticky" : ""}
        sx={{
          bgcolor: theme.palette.background.default,
        }}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
      {/* drawer */}
      <Sidebar
        // drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
        drawerToggle={leftDrawerOpened}
      />
      {/* main content */}
      <section className="wrapper-content">
        <Container maxWidth={false} disableGutters>
          <Outlet />
        </Container>
      </section>
    </Box>
  );
};

export default LayoutCommunity;
