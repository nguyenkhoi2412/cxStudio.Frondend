import "./_header.scss";
import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Avatar, Box, ButtonBase, useMediaQuery } from "@mui/material";

// project imports
import LogoSection from "../logoSection";
import SearchSection from "./searchSection";
import ProfileSection from "./profileSection";
import ToggleThemeSection from "./toggleThemeSection";
import NotificationSection from "./notificationSection";
import MoreIconOnMobile from "./moreIconOnMobile";

// assets
import { IconMenu2 } from "@tabler/icons-react";
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const leftDrawerOpened = useSelector((state) => state.customization.opened);

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 220,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            {/* <IconMenu2 stroke={1.5} size="1.3rem" /> */}
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* toggleThemeSection */}
      <ToggleThemeSection />

      {/* notification & profile */}
      {/* {matchesXs ? <></> : <NotificationSection />} */}
      <ProfileSection />
      <MoreIconOnMobile />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
