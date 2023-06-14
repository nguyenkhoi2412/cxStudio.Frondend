import { hookInstance } from "@utils/hookInstance";
import DashboardMainContentCardWrapper from "@dashboard/_layout/mainContentCardWrapper";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";

const DashboardDefault = (props) => {
  return (
    <DashboardMainContentCardWrapper
      title={`Dashboard default`}
      secondary={
        <SecondaryAction link="https://mui.com/material-ui/material-icons/" />
      }
    ></DashboardMainContentCardWrapper>
  );
};

export default DashboardDefault;
