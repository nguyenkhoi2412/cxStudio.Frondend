import { navigatePath } from "@routes/navigatePath";
import _globalVars from "@constants/variables";
import socketClient from "socket.io-client";

const ASSET_PATH = _globalVars.ASSET_PATH;

const configSettings = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: ASSET_PATH,
  defaultPath: navigatePath.CLIENT_APP.COMMUNITY.INDEX,
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  mode: localStorage.getItem("themeMode") === "dark" ? "dark" : "light", // light/dark
  socket: socketClient.connect(process.env.API_HOSTNAME),
};

export default configSettings;
