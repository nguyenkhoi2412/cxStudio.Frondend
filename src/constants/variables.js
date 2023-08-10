export default {
  ASSET_PATH: process.env.ASSET_PATH || "/",
  SITE_ID: process.env.SITE_ID || "",
  //* use for dashboard page
  stripedHtml: /(<([^>]+)>)/gi,
  specialCharacters: /[!@#$%^&*(),.?":{}|<>]/gi,
  passwordRegex:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
  regexXSS: /[^\w\s]/gi,
  regexEditor: /<p><br><\/p>|<div><br><\/div>/g,
  //* use for frontend site
  defaultDateFormat: "YYYY-MM-DD",
  locale: {
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
