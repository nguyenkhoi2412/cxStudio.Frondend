import { navigatePath } from '@routes/navigatePath';
import { CLIENT_APP } from '@routes/componentLoadable';
import APP from '@constants/app';
import ErrorRoutes from './_error';

const LaundryServiceRoutes = [
  {
    element: <CLIENT_APP.LAYOUT appName={APP.EMPTY} />,
    industry: APP.INDUSTRY.LAUNDRY,
    children: [
      {
        path: navigatePath.CLIENT_APP.LAUNDRY.DEFAULT,
        title: '🧺 Laundry | Workspace',
        exact: true,
        element: (
          <CLIENT_APP.LAUNDRY.DEFAULT
            requireAuth={true}
            redirectTo={navigatePath.AUTH.SIGNIN}
          />
        ),
      },
      {
        path: navigatePath.CLIENT_APP.LAUNDRY.STATISTIC,
        title: '🧺 Statistic | Laundry | Workspace',
        exact: true,
        element: (
          <CLIENT_APP.LAUNDRY.STATISTIC
            requireAuth={true}
            redirectTo={navigatePath.AUTH.SIGNIN}
          />
        ),
      },
    ],
  },
  ...ErrorRoutes,
];

export default LaundryServiceRoutes;
