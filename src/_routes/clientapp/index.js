import { navigatePath } from '../navigatePath';
import APP from '@constants/app';

// project imports
import { DASHBOARD, CLIENT_APP } from '@routes/componentLoadable';
import AuthRoutes from './_auth';
import CommunityRoutes from './community';
import LaundryServicesRoutes from './laundry-service';
// ==============================|| MAIN ROUTING ||============================== //

const ClientAppRoutes = [
  ...AuthRoutes,
  {
    element: (
      <CLIENT_APP.LAYOUT
        requireAuth={true}
        redirectTo={navigatePath.AUTH.SIGNIN}
        appName={APP.EMPTY}
      />
    ),
    children: [
      {
        path: navigatePath.CLIENT_APP.ASSET_PATH,
        title: 'Create/Open a workspace',
        element: <CLIENT_APP.HOME />,
      },
      {
        path: navigatePath.CLIENT_APP.APP,
        title: 'Create/Open a workspace',
        element: <CLIENT_APP.HOME />,
      },
      {
        path: navigatePath.UTILITIES.TYPOGRAPHY,
        title: 'TYPOGRAPHY',
        element: <DASHBOARD.UTILITIES.TYPOGRAPHY />,
      },
      {
        path: navigatePath.UTILITIES.GENERATE_KEY,
        title: 'GENERATEKEY',
        element: <DASHBOARD.UTILITIES.GENERATE_KEY />,
      },
    ],
  },
  ...CommunityRoutes,
  ...LaundryServicesRoutes,
];
// path: navigatePath.CLIENT_APP.ASSET_PATH,
// element: <CLIENT_APP.LAYOUT />,
// children: [
//   {
//     path: navigatePath.CLIENT_APP.ASSET_PATH,
//     title: "Social profile",
//     element: <SocialProfile />,
//   },
// ],
// {
//   path: navigatePath.CLIENT_APP.ASSET_PATH,
//   title: "Social profile",
//   element: <CLIENT_APP.HOME />,
// }{}
// ];

export default ClientAppRoutes;
