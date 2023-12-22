// material-ui
import { useTheme } from "@mui/material/styles";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { Avatar, Box, ButtonBase, useMediaQuery } from "@mui/material";

import { SET_MODE } from "@reduxproviders/berry/actions";
import { CUSTOMIZATION } from "@reduxproviders/berry/customization.reducer";
import { useDispatch, useSelector } from "react-redux";

// notification status options
const modeTheme = {
  DARK: "dark",
  LIGHT: "light",
};

// ==============================|| NOTIFICATION ||============================== //

const ToggleThemeSection = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();

  // state - mode
  const [mode, setMode] = React.useState(customization.mode);

  // React.useEffect(() => {
  //   let myDate = new Date();
  //   let hours = myDate.getHours();

  //   if (hours > 6 && hours < 18) {
  //     setMode(modeTheme.LIGHT);
  //   } else {
  //     setMode(modeTheme.DARK);
  //   }
  // }, []);

  React.useEffect(() => {
    dispatch(CUSTOMIZATION({ type: SET_MODE, mode: mode }));
  }, [dispatch, mode]);

  const ToggleThemeIcon = React.useMemo(
    () => (mode === modeTheme.DARK ? IconMoonFilled : IconSunFilled),
    [mode]
  );

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 0,
          [theme.breakpoints.down("md")]: {
            mr: 0,
          },
        }}
      >
        <ButtonBase sx={{ borderRadius: "12px" }}>
          <Avatar
            variant="rounded"
            className="navButtons"
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={() =>
              setMode(
                mode === modeTheme.DARK ? modeTheme.LIGHT : modeTheme.DARK
              )
            }
            color="inherit"
          >
            <ToggleThemeIcon className="toggleTheme" />
          </Avatar>
        </ButtonBase>
      </Box>
    </>
  );
};

export default ToggleThemeSection;
