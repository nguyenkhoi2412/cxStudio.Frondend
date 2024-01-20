import "./_viewOwner.scss";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "@constants";

//#region utils
import { crossCutting, loop, string, object } from "@utils/crossCutting";
//#endregion
//#region material-ui
import { Grid } from "@mui/material";
import FadeAnimation from "@components/mui-ui/extended/fadeAnimation";
//#endregion
//#region project import
import Spin from "@components/common/spin/spin";
import MainCard from "@components/mui-ui/cards";
import AlignItemsList from "@components/mui-ui/list/alignItems";
//#endregion
//#region reduxprovider
import { useSelector } from "react-redux";
import { WorkspaceService } from "@services/workspace";
//#endregion

const ViewOwner = ({ data }) => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [dataValue, setDataValue] = React.useState([]);
  const [fadeIn, setFadeIn] = React.useState(true);

  //#region get datas
  const getWorkspaceOwner = (wp) => {
    if (crossCutting.check.isNull(wp)) return;
    WorkspaceService.getOwner({
      data: wp,
      currentUser: currentUser,
    }).then((rs) => {
      if (crossCutting.check.isNull(rs)) return;

      let itemsList = [];
      loop.every(rs, (item, index) => {
        itemsList.push({
          avatar: item.logo_path,
          key: item._id,
          primaryText: string.render(item.name),
          name: string.render(item.company),
          desc: string.render(object.getValue(item, "industry_related.name")),
        });
      });

      setDataValue(itemsList);
      setFadeIn(true);
    });
  };
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    getWorkspaceOwner(data);
  }, [data]);
  //#endregion

  return (
    <FadeAnimation isOpen={fadeIn}>
      <MainCard
        className="wrapper-owner"
        //   {...other}
        darkTitle={true}
        title={t("workspace.workspaces_for") + " " + currentUser.email}
        headerClass="title"
        // secondary={
        //   <>
        //     <SecondaryAction link="https://next.material-ui.com/system/shadows/" />
        //   </>
        // }
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} className="align-itemlist">
            {crossCutting.check.isNotNull(dataValue) ? (
              <AlignItemsList itemlist={dataValue} />
            ) : (
              <Spin load={true} />
            )}
          </Grid>
        </Grid>
      </MainCard>
    </FadeAnimation>
  );
};

export default React.memo(ViewOwner, (props, nextProps) => {
  if (crossCutting.check.isEquals(props, nextProps)) {
    // return true if you don't need re-render
    return true;
  }
});
