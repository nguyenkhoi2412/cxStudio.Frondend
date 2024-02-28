import './_statistic.scss';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from '@constants';
import { crossCutting } from '@utils/crossCutting';
//#region mui-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
//#endregion
//#region import components
import MainCard from '@components/mui-ui/cards';
import WorkspaceList from '@clientapp/components/workspace/viewWorkspaceList';
import ViewCreateNew from '@clientapp/components/workspace/viewCreateNew';
//#endregion
//#region reduxprovider
import { WorkspaceService } from '@services/workspace';
import { useDispatch, useSelector } from 'react-redux';
import { WORKSPACE_GET_BY_USER } from '@reduxproviders/workspace.reducer';
//#endregion

const Statistic = () => {
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
        Statistic
      </Grid>
    </MainCard>
  );
};

export default Statistic;
