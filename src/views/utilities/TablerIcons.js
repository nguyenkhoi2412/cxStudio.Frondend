import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";

// project imports
import DashboardMainContentCardWrapper from "@dashboard/_layout/mainContentCardWrapper";
import MainCard from "@components/mui-ui/cards";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";

// assets
import LinkIcon from "@mui/icons-material/Link";

// styles
const IFrameWrapper = styled("iframe")(({ theme }) => ({
  height: "calc(100vh - 210px)",
  border: "1px solid",
  borderColor: theme.palette.primary.light,
}));

// =============================|| TABLER ICONS ||============================= //

const TablerIcons = () => (
  <DashboardMainContentCardWrapper
      title={`@tabler/icons-react`}
      secondary={
        <SecondaryAction link="https://mui.com/material-ui/material-icons/" />
      }
    >
    <Card sx={{ overflow: "hidden" }}>
      <IFrameWrapper
        title="Tabler Icons"
        width="100%"
        src="https://tabler-icons.io"
      />
    </Card>
  </DashboardMainContentCardWrapper>
);

export default TablerIcons;
