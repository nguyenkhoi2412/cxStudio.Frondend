import './_statistic.scss';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from '@constants';
import { crossCutting, hook } from '@utils/crossCutting';
//#region mui-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
//#endregion
//#region import components
import MainCard from '@components/mui-ui/cards';
import EarningCard from '@components/mui-ui/cards/templates/earningCard';
import WorkspaceList from '@clientapp/components/workspace/viewWorkspaceList';
import CreateNew from '@clientapp/components/workspace/createNew';
//#endregion
//#region reduxprovider
import { WorkspaceService } from '@services/workspace';
import { useDispatch, useSelector } from 'react-redux';
import { WORKSPACE_GET_BY_USER } from '@reduxproviders/workspace.reducer';
//#endregion

const Statistic = () => {
  const params = useParams();
  const abc = hook.useIsActiveTab();

  console.log('idsfsdfsdfsdf', abc);
  return (
    <MainCard
      // title="general"
      className="industry-laundry"
      // contentClass="workspace"
      // secondary={
      //   <SecondaryAction link="https://next.material-ui.com/system/typography/" />
      // }
    >
      <Grid container spacing={gridSpacing} direction={'row'}>
        <Grid item xs={3} spacing={gridSpacing}>
          <EarningCard title="Total Earning" />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Statistic;
