import React from "react";
import "./_chatbox.scss";
//#region mui-ui
import { Grid, Link } from "@mui/material";
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
import ChatBar from "@chatbox/components/chatbar";
import ChatBody from "@chatbox/components/chatbody";
import ChatFooter from "@chatbox/components/chatfooter";
//#endregion

const ChatBox = (props) => {
  // variables
  const socket = useSelector(
    (state) => state.customization.configSettings.socket
  );
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [messages, setMessages] = React.useState([]);
  const [typingStatus, setTypingStatus] = React.useState("");
  const lastMessageRef = React.useRef(null);

  //#region useHooks
  React.useEffect(() => {
    socket.emit("liveChat__join", {
      socketId: socket.id,
      currentUser,
    });
  }, []);

  React.useEffect(() => {
    socket.on("liveChat__messageResponse", (data) =>
      setMessages([...messages, data])
    );
  }, [socket, messages]);

  React.useEffect(() => {
    socket.on("liveChat__typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  React.useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  //#endregion
  // configSettings.socket.emit("message", "ádf");
  return (
    <>
      <MainCard
        title="general"
        className="chat__main"
        // secondary={
        //   <SecondaryAction link="https://next.material-ui.com/system/typography/" />
        // }
      >
        <Grid container spacing={gridSpacing}>
          <ChatBody
            messages={messages}
            typingStatus={typingStatus}
            lastMessageRef={lastMessageRef}
          />
          <ChatFooter />
        </Grid>
      </MainCard>
    </>
  );
};

export default ChatBox;
