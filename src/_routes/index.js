import { useRoutes } from 'react-router-dom';
import { crossCutting, hook, string } from '@utils/crossCutting';
import { useTranslation } from 'react-i18next';
// routes
import APP from '@constants/app';
// import AuthenticationRoutes from "./data/authentication";
import DashboardRoutes from './dashboard';
import ClientAppRoutes from './clientapp';
// import AuthenticationRoutes from './AuthenticationRoutes';

const RouteMaps = [...ClientAppRoutes];

const buildTitle = () => {
  const currentLocation = hook.useRouter();
  const { t } = useTranslation();
  const { pathname } = currentLocation;

  React.useEffect(() => {
    let currentTitle = null;
    const currentRoute = RouteMaps.find((item) => {
      const { path, industry, children } = item;

      if (!children) {
        return path === pathname || getCurrentRoute(industry, item, pathname);
      } else {
        return children.find((child) => {
          if (
            child.path === pathname ||
            getCurrentRoute(industry, child, pathname)
          ) {
            currentTitle = child?.title;
            return child;
          }
        });
      }
    });

    if (currentTitle === null) currentTitle = currentRoute?.title || '';
    document.title = t(currentTitle);
  }, [currentLocation]);
};

const getCurrentRoute = (type, item, urlPathname) => {
  const industryType = {
    [APP.INDUSTRY.LAUNDRY]: urlPathname.match(string.routeMatcher(item.path))
  };

  return crossCutting.check.isNotNull(industryType[type]);
};

// ==============================|| ROUTING RENDER ||============================== //
export const BuildRoutes = () => {
  buildTitle();

  return useRoutes(RouteMaps);
};
