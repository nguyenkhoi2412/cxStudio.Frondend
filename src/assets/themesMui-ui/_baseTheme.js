import color from "./palette.module.scss";
import { createTheme } from "@mui/material/styles";
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./themePalette";
import themeTypography from "./typography";

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const configBaseTheme = (customization) => {
  const themeOption = {
    // palette values for light mode
    mode: customization.darkMode,
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.primaryDark,
    menuSelectedBack: color.primaryLight,
    divider: color.grey200,
    customization,
  };

  const themes = createTheme({
    direction: "ltr",
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: themeTypography(themeOption),
  });
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};
