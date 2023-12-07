import "./_home.scss";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";

//#region mui-ui
import { Grid, CardMedia, Button } from "@mui/material";
//#endregion
//#region import components
import MainCard from "@components/mui-ui/cards";
import SubCard from "@components/mui-ui/cards/subCard";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";
import { gridSpacing } from "@constants";
//#endregion
import imgWP from "@assets/images/bg_workspace.svg";

const Home = () => {
  const navigage = useNavigate();

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
        justifyContent={`center`}
        textAlign={`center`}
        spacing={gridSpacing}
      >
        <Grid item xs={12} md={6} className="wsa--intro">
          <Button
            className="btn"
            variant="contained"
            onClick={() => navigage("/dashboard")}
          >
            Create new workspace
          </Button>
        </Grid>
        <Grid item xs={12} md={6} className="wsa--img">
          <Tilt>
            <CardMedia
              className="responsive"
              component="img"
              height={550}
              width={`auto`}
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
