// assets
// import {
//   IconRadioactive,
//   IconTypography,
//   IconPalette,
//   IconShadow,
//   IconWindmill,
// } from "";
import { navigatePath } from "@routes/navigatePath";

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
      url: navigatePath.UTILITIES.GENERATE_KEY,
      // icon: icons.IconRadioactive,
      target: false,
      breadcrumbs: false,
    },
    {
      id: "util-typography",
      title: "Typography",
      type: "item",
      url: navigatePath.UTILITIES.TYPOGRAPHY,
      // icon: icons.IconTypography,
      target: false,
      breadcrumbs: false,
    },
    {
      id: "util-color",
      title: "Color",
      type: "item",
      url: navigatePath.UTILITIES.COLOR,
      // icon: icons.IconPalette,
      target: false,
      breadcrumbs: false,
    },
    {
      id: "util-shadow",
      title: "Shadow",
      type: "item",
      url: navigatePath.UTILITIES.SHADOW,
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
          url: navigatePath.UTILITIES.TABLERICONS,
          target: false,
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default utilities;
