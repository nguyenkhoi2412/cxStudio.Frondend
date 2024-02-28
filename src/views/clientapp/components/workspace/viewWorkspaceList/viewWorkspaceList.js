import './_viewWorkspaceList.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from '@constants';
import APP from '@constants/app';
import { navigatePath } from '@routes/navigatePath';

//#region utils
import { crossCutting, loop, string, object } from '@utils/crossCutting';
//#endregion
//#region material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Box, useMediaQuery } from '@mui/material';
import FadeAnimation from '@components/mui-ui/extended/fadeAnimation';
import { IconDotsVertical } from '@tabler/icons-react';
//#endregion
//#region project import
import Spin from '@components/common/spin/spin';
import MainCard from '@components/mui-ui/cards';
import AlignItemsList from '@components/mui-ui/list/alignItems';
import LoadingButton from '@components/mui-ui/extended/loadingButton';
//#endregion
//#region reduxprovider
import { useSelector } from 'react-redux';
//#endregion

const ViewWorkspaceList = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [dataValue, setDataValue] = React.useState([]);
  const [fadeIn, setFadeIn] = React.useState(true);

  //#region get datas
  const buildWpList = (wp) => {
    let itemsList = [];

    loop.every(wp, (item, index) => {
      itemsList.push({
        avatar: item.logo_path,
        key: item._id,
        primaryText: string.render(item.name),
        name: string.render(item.company),
        desc: string.render(object.getValue(item, 'industry_related.name')),
        action: (
          <>
            {/* <IconDotsVertical /> */}
            <LoadingButton
              text={t('common.launch')}
              onClick={() => handleNavigateToWorkspace(item)}
            />
          </>
        ),
      });
    });

    setDataValue(itemsList);
    setFadeIn(itemsList.length > 0);
  };
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    buildWpList(data);
  }, [data]);
  //#endregion

  //#region handle events
  const handleNavigateToWorkspace = (wp) => {
    const navToWorkspace = {
      [APP.INDUSTRY.LAUNDRY]: navigate(
        navigatePath.CLIENT_APP.LAUNDRY.STATISTIC,
      ),
    };

    navToWorkspace[wp?.industry_related?.type];
  };
  //#endregion

  return (
    <FadeAnimation isOpen={fadeIn}>
      <MainCard
        className="bound-container"
        //   {...other}
        darkTitle={true}
        title={t('workspace.workspaces_for') + ' ' + currentUser.email}
        // secondary={
        //   <>
        //     <SecondaryAction link="https://next.material-ui.com/system/shadows/" />
        //   </>
        // }
      >
        <Grid container spacing={gridSpacing} alignItems={'center'}>
          <Grid item xs={12} className="align-itemlist">
            {crossCutting.check.isNotNull(dataValue) ? (
              <AlignItemsList itemlist={dataValue} responsive={true} />
            ) : (
              <Spin load={true} />
            )}
          </Grid>
        </Grid>
      </MainCard>
    </FadeAnimation>
  );
};

export default React.memo(ViewWorkspaceList, (props, nextProps) => {
  if (crossCutting.check.isEquals(props, nextProps)) {
    // return true if you don't need re-render
    return true;
  }
});
