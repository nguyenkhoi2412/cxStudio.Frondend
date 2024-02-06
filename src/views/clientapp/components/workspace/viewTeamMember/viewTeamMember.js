import "./_viewTeamMember.scss";
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
import LoadingButton from "@components/mui-ui/extended/loadingButton";
//#endregion
//#region reduxprovider
import { useSelector } from "react-redux";
//#endregion

const ViewTeamMember = ({ data }) => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [dataValue, setDataValue] = React.useState([]);
  const [fadeIn, setFadeIn] = React.useState(true);

  //#region get datas
  const buildWpTeamMembers = (wp) => {
    let itemsList = [];
    loop.every(wp, (item, index) => {
      itemsList.push({
        avatar: item.logo_path,
        key: item._id,
        primaryText: string.render(item.name),
        name: string.render(item.company),
        desc: string.render(object.getValue(item, "industry_related.name")),
        action: (
          <LoadingButton
            text={t("common.launch")}
            onClick={() => alert("adfsdf")}
          />
        ),
      });
    });

    setDataValue(itemsList);
    setFadeIn(itemsList.length > 0);
  };
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    buildWpTeamMembers(data);
  }, [data]);
  //#endregion

  return (
    <FadeAnimation isOpen={fadeIn}>
      <MainCard
        className="wrapper-team-member"
        //   {...other}
        darkTitle={true}
        title={t("workspace.workspaces_for") + " " + currentUser.email}
        // secondary={
        //   <>
        //     <SecondaryAction link="https://next.material-ui.com/system/shadows/" />
        //   </>
        // }
      >
        <Grid container spacing={gridSpacing}>
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

export default React.memo(ViewTeamMember, (props, nextProps) => {
  if (crossCutting.check.isEquals(props, nextProps)) {
    // return true if you don't need re-render
    return true;
  }
});
