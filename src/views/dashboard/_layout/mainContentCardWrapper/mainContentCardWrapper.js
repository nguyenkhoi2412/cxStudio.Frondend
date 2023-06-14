import "./_mainContentCardWrapper.scss";
// assets

// material-ui
import { Grid } from "@mui/material";
// project import
import MainCard from "@components/mui-ui/cards";
import { gridSpacing } from "@constants";

// ==============================|| DASHBOARD MAIN CONTENT CARD WRAPPER ||============================== //

const MainContentCardWrapper = ({ children, ...other }) => (
  <MainCard
    className="dashboard wrapper-container"
    {...other}
    // title="Basic Shadows"
    // secondary={
    //   <>
    //     <SecondaryAction link="https://next.material-ui.com/system/shadows/" />
    //   </>
    // }
  >
    <Grid container spacing={gridSpacing}>
      {children}
    </Grid>
  </MainCard>
);

export default MainContentCardWrapper;
