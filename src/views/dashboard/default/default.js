import { hookInstance } from "@utils/hookInstance";
import { useTheme, styled } from "@mui/material/styles";
import DashboardMainContentCardWrapper from "@dashboard/_layout/mainContentCardWrapper";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";

const DashboardDefault = (props) => {
  const theme = useTheme();

  return (
    <DashboardMainContentCardWrapper
      title={`Dashboard default`}
      // secondary={
      //   <SecondaryAction
      //     link="https://mui.com/material-ui/material-icons/"
      //     color={theme.palette.background.default}
      //   />
      // }
    ></DashboardMainContentCardWrapper>
  );
};

export default DashboardDefault;
