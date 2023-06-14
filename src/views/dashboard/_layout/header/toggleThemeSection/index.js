import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { IconMoonFilled, IconSunFilled} from "@tabler/icons-react";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CardActions,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import MainCard from "@components/mui-ui/cards";
import Transitions from "@components/mui-ui/extended/transitions";

import { SET_MODE } from "@reduxproviders/berry/actions";
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
  const [mode, setMode] = useState(customization.mode);
  useEffect(() => {
    dispatch({ type: SET_MODE, mode: mode });
  }, [dispatch, mode]);

  const ToggleThemeIcon = useMemo(
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
            onClick={() => setMode(mode === modeTheme.DARK ? modeTheme.LIGHT : modeTheme.DARK)}
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
