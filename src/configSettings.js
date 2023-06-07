import { navigateLocation } from "@routes/navigateLocation";
import vars from "@constants/variables";

const ASSET_PATH = vars.ASSET_PATH;

const configSettings = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: ASSET_PATH,
  defaultPath: navigateLocation.DASHBOARD.DEFAULT,
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  mode: localStorage.getItem("themeMode") === "dark" ? "dark" : "light", // light/dark
};

export default configSettings;
