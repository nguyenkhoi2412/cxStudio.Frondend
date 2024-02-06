import "./_home.scss";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "@constants";
import { crossCutting } from "@utils/crossCutting";
//#region mui-ui
import { useTheme } from "@mui/material/styles";
import { Grid, CardMedia } from "@mui/material";
//#endregion
//#region import components
import MainCard from "@components/mui-ui/cards";
import ViewOwner from "@clientapp/components/workspace/viewOwner";
import ViewCreateNew from "@clientapp/components/workspace/viewCreateNew";
import ViewTeamMember from "@clientapp/components/workspace/ViewTeamMember";
//#endregion
import imgWP from "@assets/images/bg_workspace.svg";
//#region reduxprovider
import { useDispatch, useSelector } from "react-redux";
import { WORKSPACE_GET_BY_USER } from "@reduxproviders/workspace.reducer";
//#endregion

const Home = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const workspace = useSelector((state) => state.workspace);
  const [dataArray, setDataArray] = React.useState([]);

  //#region get data content
  const getWorkspaceByCurrentUser = async () => {
    await dispatch(
      WORKSPACE_GET_BY_USER({
        id: currentUser._id,
      })
    );
  };
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    getWorkspaceByCurrentUser();
  }, []);

  React.useEffect(() => {
    setDataArray(workspace.data);
  }, [workspace]);
  //#endregion

  //#region handle events
  //#endregion

  return (
    <MainCard
      // title="general"
      className="workspace"
      // contentClass="workspace"
      // secondary={
      //   <SecondaryAction link="https://next.material-ui.com/system/typography/" />
      // }
    >
      <Grid container spacing={gridSpacing} direction={"row"}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={gridSpacing}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item xs={12} md={10}>
              <ViewOwner data={dataArray} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={gridSpacing}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ViewCreateNew data={dataArray} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={gridSpacing}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item xs={12} md={10}>
              <ViewTeamMember data={dataArray} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Home;
