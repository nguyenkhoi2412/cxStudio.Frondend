import "./_createNew.scss";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "@constants";
import _globalVars from "@constants/variables";
import { crossCutting } from "@utils/crossCutting";
//#region mui-ui
import {
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Tooltip,
  CardMedia,
} from "@mui/material";
//#endregion
//#region import components
import MainCard from "@components/mui-ui/cards";
import FormAction from "@clientapp/components/workspace/forms/newWorkspace";
import LoadingButton from "@components/mui-ui/extended/loadingButton";
//#endregion
import imgWP from "@assets/images/bg_workspace.svg";
import imgPWR from "@assets/images/people-working-remotely_bg.svg";
//#region reduxprovider
import { useDispatch, useSelector } from "react-redux";
import { OPEN_DRAWER } from "@components/mui-ui/drawer/drawer.reducer";
//#endregion
//#endregion

const CreateNew = ({ data, wpOwner }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [termsChecked, setTermsChecked] = React.useState(false);
  const [dataValue, setDataValue] = React.useState([]);
  const disabledCbTerms = React.useMemo(() => {
    return wpOwner?.length >= parseInt(_globalVars.WORKSPACE_FREE);
  }, [wpOwner]);

  const disabledBtnCreate = React.useMemo(() => {
    return disabledCbTerms || !termsChecked;
  }, [termsChecked, disabledCbTerms]);
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    setDataValue(data);
  }, [data]);
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

  //#region render components
  const renderCheckboxTerms = (
    <FormControlLabel
      className={"terms" + (disabledCbTerms ? " disabled" : "")}
      sx={{ alignItems: "flex-start" }}
      control={
        <Tooltip
          title={
            disabledCbTerms ? t("workspace.limited_for_one_workpsace") : ""
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
              onChange={(event) => setTermsChecked(event.target.checked)}
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
  );

  const renderFullView = () => {
    if (crossCutting.check.isNull(dataValue)) return <></>;

    return (
      <>
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
                {t("workspace.speedup_management_communication_report_search")}
              </Typography>
            </Grid>
            <Grid item className="acts" textAlign={"center"}>
              <LoadingButton
                disabled={disabledBtnCreate}
                text={t("workspace.btn_create_new_workspace")}
                onClick={handleOpenDrawerRight}
              />
            </Grid>
            <Grid item>{renderCheckboxTerms}</Grid>
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
      </>
    );
  };

  const renderSimpleView = () => {
    return (
      <>
        <Grid item xs={12} md={10}>
          <MainCard
            //   {...other}
            darkTitle={true}
            contentClass="wsa__createnew"
          >
            <Grid
              container
              spacing={gridSpacing}
              alignItems={"center"}
              justifyContent={"center"}
              direction={"row"}
            >
              <Grid item xs={12} md={7} className="desc">
                <CardMedia
                  className="responsive"
                  component="img"
                  width={"auto"}
                  image={imgPWR}
                  alt="People Working Remotely"
                />
              </Grid>
              <Grid item xs={12} md={5} className="acts" textAlign={"center"}>
                <Grid container spacing={gridSpacing} direction={"column"}>
                  <Grid item xs={12} className="desc" textAlign={"left"}>
                    <Typography variant="h2" gutterBottom>
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
                  <Grid item textAlign={"left"}>
                    {renderCheckboxTerms}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LoadingButton
                      disabled={disabledBtnCreate}
                      text={t("workspace.btn_create_new_workspace")}
                      onClick={handleOpenDrawerRight}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </>
    );
  };
  //#endregion

  return <>{wpOwner?.length > 0 ? renderSimpleView() : renderFullView()}</>;
};

export default React.memo(CreateNew, (props, nextProps) => {
  if (crossCutting.check.isEquals(props, nextProps)) {
    // return true if you don't need re-render
    return true;
  }
});
