import React from "react";
import "./_chatbody.scss";

//#region mui-ui
import { Grid, Box, Stack, Link } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
//#endregion
//#region reducer
import { useSelector } from "react-redux";
//#endregion
//#region import components
import MainCard from "@components/mui-ui/cards";
import SubCard from "@components/mui-ui/cards/subCard";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";
import { gridSpacing } from "@constants";
import RenderMessage from "./renderMessage";
//#endregion

const ChatBody = (props) => {
  const { messages, typingStatus } = props;

  const messagesEndRef = React.createRef(null);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [dataMessages, setDataMessages] = React.useState([]);

  //#region 👇️ useEffect
  React.useEffect(() => {
    setDataMessages(messages);
  }, [messages]);

  // React.useEffect(() => {
  //   console.log("typingStatus", typingStatus);
  // }, [typingStatus]);

  React.useEffect(() => {
    scrollToBottom();
  });
  //#endregion

  //#region handleEvents
  const scrollToBottom = () => {
    // 👇️ scroll to bottom every time messages change
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  //#endregion

  return (
    <>
      <Grid item className="chat__content">
        <Grid container spacing={gridSpacing}>
          {dataMessages.map((item) => (
            <RenderMessage key={item._id} message={item} />
          ))}
          <div id="messageEndRef" ref={messagesEndRef}></div>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(ChatBody, (props, nextProps) => {
  if (props.messages === nextProps.messages) {
    // return true if you don't need re-render
    return true;
  }
});
