import "./_home.scss";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "@constants";
import { crossCutting } from "@utils/crossCutting";
//#region mui-ui
import { useTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";
//#endregion
//#region import components
import MainCard from "@components/mui-ui/cards";
import WorkspaceList from "@clientapp/components/workspace/viewWorkspaceList";
import CreateNew from "@clientapp/components/workspace/createNew";
//#endregion
//#region reduxprovider
import { WorkspaceService } from "@services/workspace";
import { useDispatch, useSelector } from "react-redux";
import { WORKSPACE_GET_BY_USER } from "@reduxproviders/workspace.reducer";
//#endregion

const Home = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const workspace = useSelector((state) => state.workspace);
  const [dataValue, setDataValue] = React.useState([]);
  const [wpOwner, setWpOwner] = React.useState([]);
  const [wpTeamMembers, setWpTeamMembers] = React.useState([]);

  //#region get data content
  const getWorkspaceByCurrentUser = async () => {
    await dispatch(
      WORKSPACE_GET_BY_USER({
        id: currentUser._id,
      })
    );
  };

  // get workspace create by user (owner)
  const getWorkspaceOwner = (wps) => {
    if (crossCutting.check.isNull(wps)) return [];

    WorkspaceService.getOwner({
      data: wps,
      currentUser: currentUser,
    }).then((rs) => {
      setWpOwner(rs);
    });

    return [];
  };

  // get workspace create by other user (team_members)
  const getWorkspaceTeamMembers = (wps) => {
    if (crossCutting.check.isNull(wps)) return [];

    WorkspaceService.getTeamMembers({
      data: wps,
      currentUser: currentUser,
    }).then((rs) => {
      setWpTeamMembers(rs);
    });

    return [];
  };
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    getWorkspaceByCurrentUser();
  }, []);

  React.useEffect(() => {
    setDataValue(workspace.data);
  }, [workspace]);

  React.useEffect(() => {
    getWorkspaceOwner(dataValue);
    getWorkspaceTeamMembers(dataValue);
  }, [dataValue]);
  //#endregion

  //#region render content
  const renderOwner = React.useMemo(() => {
    return wpOwner?.length > 0 ? (
      <Grid item xs={12}>
        <Grid
          container
          spacing={gridSpacing}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12} md={10}>
            <WorkspaceList data={wpOwner} />
          </Grid>
        </Grid>
      </Grid>
    ) : (
      <></>
    );
  }, [wpOwner]);

  const renderCreateNewWorkspace = React.useMemo(() => {
    return (
      <Grid item xs={12}>
        <Grid
          container
          spacing={gridSpacing}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CreateNew data={dataValue} wpOwner={wpOwner} />
        </Grid>
      </Grid>
    );
  }, [dataValue, wpOwner]);

  const renderTeamMembers = React.useMemo(() => {
    return wpTeamMembers?.length > 0 ? (
      <Grid item xs={12}>
        <Grid
          container
          spacing={gridSpacing}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12} md={10}>
            <WorkspaceList data={wpTeamMembers} />
          </Grid>
        </Grid>
      </Grid>
    ) : (
      <></>
    );
  }, [wpTeamMembers]);
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
        {renderOwner}
        {renderCreateNewWorkspace}
        {renderTeamMembers}
      </Grid>
    </MainCard>
  );
};

export default Home;
