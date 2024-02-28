import UtilsTypography from "@views/utilities/typography";
import Color from "@views/utilities/color";
import UtilsShadow from "@views/utilities/shadow";
import UtilsTablerIcons from "@views/utilities/tablerIcons";
import GenerateKey from "@views/utilities/generateKey";
import { navigatePath } from "@routes/navigatePath";

const UtilitiesRoutes = [
  {
    path: navigatePath.UTILITIES.GENERATE_KEY,
    title: "Generate key",
    element: <GenerateKey />,
  },
  {
    path: navigatePath.UTILITIES.TYPOGRAPHY,
    title: "Typography",
    element: <UtilsTypography />,
  },
  {
    path: navigatePath.UTILITIES.COLOR,
    title: "Color",
    element: <Color />,
  },
  {
    path: navigatePath.UTILITIES.SHADOW,
    element: <UtilsShadow title="Shadow" />,
  },
  {
    path: navigatePath.UTILITIES.TABLERICONS,
    title: "Tabler icons react",
    element: <UtilsTablerIcons />,
  },
];

export default UtilitiesRoutes;
