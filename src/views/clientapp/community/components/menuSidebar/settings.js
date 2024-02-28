import { Trans } from "react-i18next";
import { navigatePath } from "@routes/navigatePath";
import { IconHexagons } from "@tabler/icons-react";

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    {
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
        //     //   url: navigatePath.ACCOUNT.CREATE_NEW,
        //     //   target: false,
        //     //   breadcrumbs: false,
        //     // },
        //     {
        //       id: "userlist",
        //       title: <Trans i18nKey={"user.list"}></Trans>,
        //       type: "item",
        //       url: navigatePath.ACCOUNT.USER_LIST,
        //       target: false,
        //       breadcrumbs: false,
        //     },
        //   ],
        // },
        {
          id: "sitesettings",
          title: <Trans i18nKey={"user.account"} />,
          type: "item",
          icon: IconHexagons,
          url: "navigatePath.SITE.LIST",
          target: false,
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default menuItems;
