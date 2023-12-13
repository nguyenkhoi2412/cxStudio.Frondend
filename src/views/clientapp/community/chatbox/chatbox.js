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
  const [quillEditor, setQuillEditor] = React.useState(true);

  //#region 👇️ useHooks
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
  //#endregion
  return (
    <>
      <MainCard
        title="general"
        className="chat__main"
        contentClass="chat__body"
        // secondary={
        //   <SecondaryAction link="https://next.material-ui.com/system/typography/" />
        // }
      >
        <Grid container spacing={gridSpacing}>
          <ChatBody
            messages={messages}
            typingStatus={typingStatus}
            useHtmlEditor={quillEditor}
          />
          <ChatFooter
            useHtmlEditor={quillEditor}
            changeHtmlEditor={() => setQuillEditor((a) => !a)}
          />
        </Grid>
      </MainCard>
    </>
  );
};

export default ChatBox;
