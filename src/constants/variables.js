import { storage } from "../utils/crossCutting";

export default {
  ASSET_PATH: process.env.ASSET_PATH || "/",
  SITE_ID: process.env.SITE_ID || "",
  REFRESH_TOKEN: process.env.REFRESH_TOKEN || 50,
  WORKSPACE_FREE: process.env.WORKSPACE_FREE || 3,
  //* use for dashboard page
  stripedHtml: /(<([^>]+)>)/gi,
  specialCharacters: /[!@#$%^&*(),.?":{}|<>]/gi,
  passwordRegex:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
  regexXSS: /[^\w\s]/gi,
  regexEditor: /<p><br><\/p>|<div><br><\/div>/g,
  //* use for frontend site
  defaultDateFormat: "YYYY-MM-DD",
  locale:
    storage.local.get("locale") !== undefined
      ? storage.local.get("locale")
      : {
          _id: "36cb8e3e-9167-42a9-9dce-877541901e2d",
          lang: "en",
          code: "en-EN",
          language_name: "English",
          date_format: "MM-DD-YYYY",
          time_format: "HH:mm",
          currency: "$",
        },
  viewType: {
    LIST: "list",
    GRID: "grid",
    TREE: "tree",
  },
  pageSize: 50,
  GET: "get",
  INSERT: "insert",
  DELETE: "delete",
  UPDATE: "update",
  //* breakpoint
  breakpoint: {
    device: 768,
  },
};
