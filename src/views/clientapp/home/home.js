import "./_home.scss";
import { useNavigate } from "react-router-dom";

//#region mui-ui
import { Grid, Box, Button } from "@mui/material";
//#endregion
//#region import components
import MainCard from "@components/mui-ui/cards";
import SubCard from "@components/mui-ui/cards/subCard";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";
import { gridSpacing } from "@constants";
//#endregion

const Home = () => {
  const navigage = useNavigate();

  return (
    <MainCard
      // title="general"
      className="App"
      contentClass="workspace"
      // secondary={
      //   <SecondaryAction link="https://next.material-ui.com/system/typography/" />
      // }
    >
      <Grid
        container
        justifyContent={`center`}
        textAlign={`center`}
        spacing={gridSpacing}
        className="App"
      >
        <Button
          className="btn"
          variant="contained"
          onClick={() => navigage("/dashboard")}
        >
          Create new workspace
        </Button>
      </Grid>
    </MainCard>
  );
};

export default Home;
