// assets
import { Trans } from "react-i18next";
import { navigateLocation } from "@routes/navigateLocation";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const settings = {
  id: "settings",
  title: <Trans i18nKey={`common.settings`} />,
  caption: "Application settings",
  type: "group",
  children: [
    // ACCOUNT
    {
      id: "account",
      title: <Trans i18nKey={"user.account"} />,
      // icon: IconKey,
      type: "collapse",
      children: [
        // {
        //   id: "register",
        //   title: <Trans i18nKey={"user.addnew"}></Trans>,
        //   type: "item",
        //   url: navigateLocation.ACCOUNT.CREATE_NEW,
        //   target: false,
        //   breadcrumbs: false,
        // },
        {
          id: "userlist",
          title: <Trans i18nKey={"user.list"}></Trans>,
          type: "item",
          url: navigateLocation.ACCOUNT.USER_LIST,
          target: false,
          breadcrumbs: false,
        },
      ],
    },
    // SITE
    {
      id: "sitelist",
      title: <Trans i18nKey={"site.site"}></Trans>,
      type: "item",
      icon: WebOutlinedIcon,
      url: navigateLocation.SITE.LIST,
      target: false,
      breadcrumbs: false,
    },
  ],
};

export default settings;
