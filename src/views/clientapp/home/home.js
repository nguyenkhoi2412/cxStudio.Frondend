import "./_home.scss";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "@constants";
import { crossCutting } from "@utils/crossCutting";
//#region mui-ui
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Box,
  CardMedia,
  Typography,
  Checkbox,
  FormControlLabel,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
//#endregion
//#region import components
import MainCard from "@components/mui-ui/cards";
import FormAction from "@clientapp/components/workspace/forms/action/action";
import LoadingButton from "@components/mui-ui/extended/loadingButton";
import ViewOwner from "@clientapp/components/workspace/ViewOwner";
//#endregion
import imgWP from "@assets/images/bg_workspace.svg";
//#region reduxprovider
import { useDispatch, useSelector } from "react-redux";
import { OPEN_DRAWER } from "@components/mui-ui/drawer/drawer.reducer";
import { WORKSPACE_GET_BY_USER } from "@reduxproviders/workspace.reducer";
//#endregion

const Home = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [termsChecked, setTermsChecked] = React.useState(false);
  const [dataValue, setDataValue] = React.useState([]);
  const [owner, setOwner] = React.useState([]);
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [disabledCbTerms, setDisabledCbTerms] = React.useState(false);

  //#region get data content
  const getWorkspaceByCurrentUser = async () => {
    await dispatch(
      WORKSPACE_GET_BY_USER({
        id: currentUser._id,
      })
    )
      .unwrap()
      .then((data) => {
        if (data) {
          setDataValue(data.rs);
        }
      });
  };

  // const getWorkspaceTeams = (wp) => {
  //   if (crossCutting.check.isNull(wp)) return;
  //   WorkspaceService.getTeamMembers({
  //     data: wp,
  //     currentUser: currentUser,
  //   }).then((rs) => setTeamMembers(rs));
  // };
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    getWorkspaceByCurrentUser();
  }, []);
  //#endregion

  //#region handle events
  const handleOpenDrawerRight = () => {
    dispatch(
      OPEN_DRAWER({
        className: "workspace_created",
        title: t("workspace.enter_workspace_name"),
        render: <FormAction />,
      })
    );
  };
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
              <ViewOwner workspaceValues={dataValue} />
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
            <Grid item xs={12} md={4} className="wsa__intro">
              <Grid container spacing={gridSpacing} className="container__item">
                <Grid item className="desc" textAlign={"left"}>
                  <Typography variant="h1" gutterBottom>
                    {t("workspace.get_free_one_workspace")}
                  </Typography>
                  <Typography component={"p"} variant="body1" gutterBottom>
                    {t("workspace.optimizing_saving_your_time")}
                  </Typography>
                  <Typography component={"p"} variant="body1" gutterBottom>
                    {t(
                      "workspace.speedup_management_communication_report_search"
                    )}
                  </Typography>
                </Grid>
                <Grid item className="acts" textAlign={"center"}>
                  <LoadingButton
                    disabled={disabledCbTerms || !termsChecked}
                    text={t("workspace.btn_create_new_workspace")}
                    onClick={handleOpenDrawerRight}
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={"terms" + (disabledCbTerms ? " disabled" : "")}
                    sx={{ alignItems: "flex-start" }}
                    control={
                      <Tooltip
                        title={
                          disabledCbTerms
                            ? t("workspace.limited_for_one_workpsace")
                            : ""
                        }
                        placement="top"
                      >
                        <span>
                          <Checkbox
                            sx={{
                              marginTop: -1,
                            }}
                            disabled={disabledCbTerms}
                            checked={termsChecked && !disabledCbTerms}
                            onChange={(event) =>
                              setTermsChecked(event.target.checked)
                            }
                            name="terms"
                          />
                        </span>
                      </Tooltip>
                    }
                    label={
                      <Typography variant="subtitle2">
                        {t("workspace.terms_and_conditions")}
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className="wsa__img"
              justifyContent={"center"}
            >
              <CardMedia
                className="responsive"
                component="img"
                height={550}
                width={"auto"}
                image={imgWP}
                alt="Paella dish"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Home;
