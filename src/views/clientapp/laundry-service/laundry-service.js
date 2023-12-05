import "./_laundry-service.scss";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

//#region mui-ui
import { Grid, Box } from "@mui/material";
//#endregion
//#region import components
import MainCard from "@components/mui-ui/cards";
import SubCard from "@components/mui-ui/cards/subCard";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";
import { gridSpacing } from "@constants";
//#endregion

const LaundryServices = () => {
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <MainCard
        // title="general"
        className="chat__main"
        contentClass="chat__body"
        // secondary={
        //   <SecondaryAction link="https://next.material-ui.com/system/typography/" />
        // }
      >
        <Grid container spacing={gridSpacing}>
          {/* <ChatBody
            messages={messages}
            typingStatus={typingStatus}
            useHtmlEditor={quillEditor}
          />
          <ChatFooter
            useHtmlEditor={quillEditor}
            changeHtmlEditor={() => setQuillEditor((a) => !a)}
          /> */}
          assss
        </Grid>
      </MainCard>
    </>
  );
};

export default LaundryServices;
