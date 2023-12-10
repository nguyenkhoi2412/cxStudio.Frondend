import "./_home.scss";
import { useTranslation } from "react-i18next";
import Tilt from "react-parallax-tilt";
import { gridSpacing } from "@constants";

//#region mui-ui
import {
  Grid,
  CardMedia,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
//#endregion
//#region import components
import MainCard from "@components/mui-ui/cards";
import SubCard from "@components/mui-ui/cards/subCard";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";
import WpDrawer from "@components/mui-ui/drawer";
//#endregion
import imgWP from "@assets/images/bg_workspace.svg";
//#region reduxprovider
import { useDispatch, useSelector } from "react-redux";
import { OPEN_DRAWER } from "@components/mui-ui/drawer/drawer.reducer";
//#endregion

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [termsChecked, setTermsChecked] = React.useState(false);

  //#region handle events
  const handleOpenDrawerRight = () => {
    dispatch(
      OPEN_DRAWER({
        className: "sdfsdfsfsfsdf",
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
      <Grid
        container
        spacing={gridSpacing}
        direction={"row"}
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
                {t("workspace.speedup_management_communication_report_search")}
              </Typography>
            </Grid>
            <Grid item className="acts" textAlign={"center"}>
              <Button
                className="btn"
                variant="contained"
                disabled={!termsChecked}
                onClick={handleOpenDrawerRight}
              >
                {t("workspace.btn_create_new_workspace")}
              </Button>
            </Grid>
            <Grid item>
              <FormControlLabel
                className="terms"
                sx={{ alignItems: "flex-start" }}
                control={
                  <Checkbox
                    sx={{
                      marginTop: -1,
                    }}
                    checked={termsChecked}
                    onChange={(event) => setTermsChecked(event.target.checked)}
                    name="terms"
                  />
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
          <Tilt className="wsa_tilt">
            <CardMedia
              className="responsive"
              component="img"
              height={550}
              width={"auto"}
              image={imgWP}
              alt="Paella dish"
            />
          </Tilt>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Home;
