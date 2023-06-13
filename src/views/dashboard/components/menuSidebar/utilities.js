// assets
// import {
//   IconRadioactive,
//   IconTypography,
//   IconPalette,
//   IconShadow,
//   IconWindmill,
// } from "";
import { navigateLocation } from "@routes/navigateLocation";

// constant
// const icons = {
//   IconRadioactive,
//   IconTypography,
//   IconPalette,
//   IconShadow,
//   IconWindmill,
// };

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: "utilities",
  title: "Utilities",
  type: "group",
  children: [
    {
      id: "util-generatekey",
      title: "Generate key",
      type: "item",
      url: navigateLocation.UTILITIES.GENERATE_KEY,
      // icon: icons.IconRadioactive,
      target: false,
      breadcrumbs: false,
    },
    {
      id: "util-typography",
      title: "Typography",
      type: "item",
      url: navigateLocation.UTILITIES.TYPOGRAPHY,
      // icon: icons.IconTypography,
      target: false,
      breadcrumbs: false,
    },
    {
      id: "util-color",
      title: "Color",
      type: "item",
      url: navigateLocation.UTILITIES.COLOR,
      // icon: icons.IconPalette,
      target: false,
      breadcrumbs: false,
    },
    {
      id: "util-shadow",
      title: "Shadow",
      type: "item",
      url: navigateLocation.UTILITIES.SHADOW,
      // icon: icons.IconShadow,
      target: false,
      breadcrumbs: false,
    },
    {
      id: "icons",
      title: "Icons",
      type: "collapse",
      // icon: icons.IconWindmill,
      children: [
        {
          id: "tabler-icons",
          title: "Tabler Icons",
          type: "item",
          url: navigateLocation.UTILITIES.TABLERICONS,
          target: false,
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default utilities;
