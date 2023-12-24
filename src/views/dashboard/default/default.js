import { hook } from "@utils/crossCutting";
import { useTheme, styled } from "@mui/material/styles";
import MainContentCardWrapper from "@dashboard/_layout/mainContentCardWrapper";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";
import ListArticles from "./articles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
//#region components
import AnimateButton from "@components/mui-ui/extended/animateButton";
import Quest_01 from "./Quest_01";
import TodoApp from "./todoApp";
import { gridSpacing } from "@constants";

const DashboardDefault = (props) => {
  const theme = useTheme();

  return (
    <>
      <MainContentCardWrapper
        title={``}
        secondary={
          <SecondaryAction
            link="https://mui.com/material-ui/material-icons/"
            color={theme.palette.background.default}
          />
        }
      >
        <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        spacing={gridSpacing}
      >
        <Quest_01 />
        <TodoApp />
        </Grid>
      </MainContentCardWrapper>
    </>
  );
};

export default DashboardDefault;
