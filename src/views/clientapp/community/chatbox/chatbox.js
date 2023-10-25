import "./_chatbox.scss";
//#region mui-ui
//#endregion
//#region reducer
import { useSelector } from "react-redux";
//#endregion
//#region import components
import ChatBar from "@chatbox/components/chatbar";
import ChatBody from "@chatbox/components/chatbody";
import ChatType from "@chatbox/components/chattyping";
//#endregion

const ChatBox = (props) => {
  // variables
  const configSettings = useSelector(
    (state) => state.customization.configSettings
  );
  const currentUser = useSelector((state) => state.auth.currentUser);
  configSettings.socket.emit("newUser", {
    socketId: configSettings.socket.id,
    currentUser,
  });
  // configSettings.socket.emit("message", "ádf");
  return <>ChatBox</>;
};

export default ChatBox;
