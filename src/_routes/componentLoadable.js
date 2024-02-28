import { lazy } from 'react';
import Loadable from '@components/common/loadable';

// ==============================|| DASHBOARD ||============================== //
export const DASHBOARD = {
  LAYOUT: Loadable(lazy(() => import('@dashboard/_layout'))),
  DEFAULT: Loadable(lazy(() => import('@dashboard/default'))),
  UTILITIES: {
    TYPOGRAPHY: Loadable(lazy(() => import('@views/utilities/Typography'))),
    GENERATE_KEY: Loadable(lazy(() => import('@views/utilities/GenerateKey'))),
  },
};

// ==============================|| MAINTENANCE ||============================== //
export const ERROR = {
  PAGE_NOTFOUND: Loadable(lazy(() => import('@views/errors/pageNotFound'))),
};

// ==============================|| CLIENT_APP ||============================== //
export const CLIENT_APP = {
  LAYOUT: Loadable(lazy(() => import('@clientapp/_layout'))),
  DEFAULT: Loadable(lazy(() => import('@clientapp/home'))),
  HOME: Loadable(lazy(() => import('@clientapp/home'))),
  //#region COMMUNITY
  COMMUNITY: {
    LAYOUT: Loadable(lazy(() => import('@clientapp/community/_layout'))),
    DEFAULT: Loadable(lazy(() => import('@clientapp/community'))),
    //* CHATBOX
    CHATBOX: {
      DEFAULT: Loadable(lazy(() => import('@clientapp/community/chatbox'))),
    },
  },
  //#endregion
  //#region LAUNDRY_SERVICE
  LAUNDRY_SERVICE: {
    DEFAULT: Loadable(lazy(() => import('@clientapp/laundry-service'))),
  },
  //#endregion
};
