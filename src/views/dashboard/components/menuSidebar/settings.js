// assets
import { Trans } from "react-i18next";
import { navigateLocation } from "@routes/navigateLocation";
import { BsDiagram3 } from "react-icons/bs";
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const settings = {
  id: "appsettings",
  title: <Trans i18nKey={`common.settings`} />,
  caption: "Application settings",
  type: "group",
  children: [
    // SITE
    // {
    //   id: "site",
    //   title: "site.managesite",
    //   icon: BiSitemap,
    //   type: "collapse",
    //   children: [
    //     // {
    //     //   id: "register",
    //     //   title: <Trans i18nKey={"user.addnew"}></Trans>,
    //     //   type: "item",
    //     //   url: navigateLocation.ACCOUNT.CREATE_NEW,
    //     //   target: false,
    //     //   breadcrumbs: false,
    //     // },
    //     {
    //       id: "userlist",
    //       title: <Trans i18nKey={"user.list"}></Trans>,
    //       type: "item",
    //       url: navigateLocation.ACCOUNT.USER_LIST,
    //       target: false,
    //       breadcrumbs: false,
    //     },
    //   ],
    // },
    // SITE
    {
      id: "sitesettings",
      title: <Trans i18nKey={"site.settings"} />,
      type: "item",
      icon: BsDiagram3,
      url: navigateLocation.SITE.LIST,
      target: false,
      breadcrumbs: false,
    },
  ],
};

export default settings;
