import { hookInstance } from "@utils/hookInstance";
import { useTheme, styled } from "@mui/material/styles";
import MainContentCardWrapper from "@dashboard/_layout/mainContentCardWrapper";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";

const DashboardDefault = (props) => {
  const theme = useTheme();

  return (
    <MainContentCardWrapper
      title={`Dashboard default`}
      secondary={
        <SecondaryAction
          link="https://mui.com/material-ui/material-icons/"
          color={theme.palette.background.default}
        />
      }
    ></MainContentCardWrapper>
  );
};

export default DashboardDefault;
