import { MODULES } from "./_modules";
import vars from "@constants/variables";

const ASSET_PATH = vars.ASSET_PATH;
const APP = ASSET_PATH + "app/";
const DASHBOARD = ASSET_PATH + MODULES.DASHBOARD;
const AUTH = DASHBOARD + "/auth";
const ACCOUNT = DASHBOARD + "/account";
const SURVEY = DASHBOARD + "/survey";
const SITE = DASHBOARD + "/site";
const UTILITIES = DASHBOARD + "/utilities";
const COMMUNITY = APP + MODULES.COMMUNITY;

export const navigateLocation = {
  DASHBOARD: {
    DEFAULT: DASHBOARD,
  },
  AUTH: {
    SIGNIN: AUTH + "/signin",
    SIGNUP: AUTH + "/signup",
    FORGOT_PASSWORD: AUTH + "/forgotpassword",
    CODE_VERIFICATION: AUTH + "/codeverification",
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
  CLIENT_APP: {
    ASSET_PATH: ASSET_PATH,
    HOME: ASSET_PATH + "home",
    APP: ASSET_PATH + "app",
    COMMUNITY: {
      DEFAULT: COMMUNITY,
    },
  },
};
