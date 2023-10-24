import { MODULES } from "@routes/_modules";
import vars from "@constants/variables";

const ASSET_PATH = vars.ASSET_PATH;
const APP = ASSET_PATH + "app/";
const ERROR = ASSET_PATH + "error";
const DASHBOARD = ASSET_PATH + MODULES.DASHBOARD;
const DASHBOARD_AUTH = DASHBOARD + "/auth";
const ACCOUNT = DASHBOARD + "/account";
const SURVEY = DASHBOARD + "/survey";
const SITE = DASHBOARD + "/site";
const UTILITIES = DASHBOARD + "/utilities";
const COMMUNITY = APP + MODULES.COMMUNITY;
const COMMUNITY_AUTH = COMMUNITY + "/auth";
const COMMUNITY_ACCOUNT = COMMUNITY + "/account";
const COMMUNITY_CHATBOX = COMMUNITY + "/chatbox";

export const navigateLocation = {
  DASHBOARD: {
    DEFAULT: DASHBOARD,
    AUTH: {
      SIGNIN: DASHBOARD_AUTH + "/signin",
      SIGNUP: DASHBOARD_AUTH + "/signup",
      FORGOT_PASSWORD: DASHBOARD_AUTH + "/forgotpassword",
      CODE_VERIFICATION: DASHBOARD_AUTH + "/codeverification",
    },
  },
  ACCOUNT: {
    SOCIAL: ACCOUNT + "/social",
    PROFILE: ACCOUNT + "/profile",
    SETTING: ACCOUNT + "/setting",
    CHANGE_PASSOWRD: ACCOUNT + "/changepassword",
    CREATE_NEW: ACCOUNT + "/createnew",
    USER_LIST: ACCOUNT + "/userlist",
  },
  SURVEY: {
    QUESTION: SURVEY + "/questions",
    ANSWER: SURVEY + "/answers",
    ORGANIZE_COURSE: SURVEY + "/organize_course",
  },
  SITE: {
    LIST: SITE + "/list",
  },
  UTILITIES: {
    GENERATE_KEY: UTILITIES + "/generatekey",
    TYPOGRAPHY: UTILITIES + "/typography",
    COLOR: UTILITIES + "/color",
    SHADOW: UTILITIES + "/shadow",
    TABLERICONS: UTILITIES + "/tablericons",
  },
  ERROR: {
    PAGE_NOTFOUND: ERROR + "/pagenotfound",
  },
  CLIENT_APP: {
    ASSET_PATH: ASSET_PATH,
    HOME: ASSET_PATH + "home",
    APP: ASSET_PATH + "app",
    //#region COMMUNITY
    COMMUNITY: {
      INDEX: COMMUNITY,
      AUTH: {
        SIGNIN: COMMUNITY_AUTH + "/signin",
        SIGNUP: COMMUNITY_AUTH + "/signup",
        FORGOT_PASSWORD: COMMUNITY_AUTH + "/forgotpassword",
        CODE_VERIFICATION: COMMUNITY_AUTH + "/codeverification",
      },
      ACCOUNT: {
        SETTING: COMMUNITY_ACCOUNT + "/setting",
      },
      CHATBOX: {
        INDEX: COMMUNITY_CHATBOX,
      },
    },
    //#endregion
  },
};
