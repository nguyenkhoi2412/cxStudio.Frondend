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
  const configSettings = useSelector(
    (state) => state.customization.configSettings
  );

  configSettings.socket.emit("message", "ádf");
  return <>ChatBox</>;
};

export default ChatBox;
