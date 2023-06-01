import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */
export const getColorsPaletteTheme = (theme) => ({
  ...(theme?.customization?.darkMode === "dark"
    ? {
        // palette for dark mode
        primary: {
          light: theme.colors?.darkSecondaryLight,
          main: theme.colors?.darkSecondaryMain,
          dark: theme.colors?.darkSecondaryDark,
          200: theme.colors?.darkSecondary200,
          800: theme.colors?.darkSecondary800,
        },
        // secondary: {
        //   light: theme.colors?.darkSecondaryLight,
        //   main: theme.colors?.darkSecondaryMain,
        //   dark: theme.colors?.darkSecondaryDark,
        //   200: theme.colors?.darkSecondary200,
        //   800: theme.colors?.darkSecondary800,
        // },
      }
    : {
        // palette for light mode
        primary: {
          light: theme.colors?.primaryLight,
          main: theme.colors?.primaryMain,
          dark: theme.colors?.primaryDark,
          200: theme.colors?.primary200,
          800: theme.colors?.primary800,
        },
        // secondary: {
        //   light: theme.colors?.secondaryLight,
        //   main: theme.colors?.secondaryMain,
        //   dark: theme.colors?.secondaryDark,
        //   200: theme.colors?.secondary200,
        //   800: theme.colors?.secondary800,
        // },
      }),
});

export default function themePalette(theme) {
  const colorsPaletteTheme = getColorsPaletteTheme(theme);

  return {
    ...colorsPaletteTheme,
    background: {
      container: theme.colors?.backgroundContainer,
      paper: theme.colors?.paper,
      default: theme.colors?.backgroundDefault,
      hover: theme.colors?.backgroundContainerLight,
    },
    common: {
      black: theme.colors?.paper,
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark,
    },
    orange: {
      light: theme.colors?.orangeLight,
      main: theme.colors?.orangeMain,
      dark: theme.colors?.orangeDark,
    },
    warning: {
      light: theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: theme.colors?.warningDark,
    },
    success: {
      light: theme.colors?.successLight,
      200: theme.colors?.success200,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark,
    },
    grey: {
      50: theme.colors?.grey50,
      100: theme.colors?.grey100,
      500: theme.darkTextSecondary,
      600: theme.heading,
      700: theme.darkTextPrimary,
      900: theme.textDark,
    },
    text: {
      primary: theme.darkTextPrimary,
      secondary: theme.darkTextSecondary,
      dark: theme.textDark,
      hint: theme.colors?.grey100,
    },
  };
}

// context for color mode
export const ModeThemeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
