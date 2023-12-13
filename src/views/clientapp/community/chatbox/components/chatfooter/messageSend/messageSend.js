import { useState } from "react";
import { useTranslation } from "react-i18next";
import { helpersExtension, objectExtension } from "@utils/helpersExtension";
import encryptHelper from "@utils/encrypt.helper";
import { useFormik } from "formik";
import _globalVars from "@constants/variables";

//#region material-ui
import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  Grid,
  InputAdornment,
  OutlinedInput,
  Popper,
} from "@mui/material";
//#endregion

//#region reducer
import { useSelector } from "react-redux";
//#endregion

// third-party
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";
import EmojiPicker from "@components/ui/emojiPicker";

// project imports
import Transitions from "@components/mui-ui/extended/transitions";
import ReactQuillEditor from "@components/mui-ui/forms/quillEditor";

// assets
import {
  IconSend,
  IconMoodSmileFilled,
  IconMoodHappyFilled,
} from "@tabler/icons-react";
import { shouldForwardProp } from "@mui/system";
import { t } from "i18next";

// styles
const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    // width: 434,
    // marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    "& input": {
      background: "transparent !important",
      paddingLeft: "4px !important",
    },
    // [theme.breakpoints.down("lg")]: {
    //   width: 250,
    // },
    // [theme.breakpoints.down("md")]: {
    //   width: "100%",
    //   marginLeft: 4,
    //   background: "#fff",
    // },
  })
);

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(
  ({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.background.container,
    color: theme.palette.font.icon,
    "&:hover": {
      background: theme.palette.background.light,
      color: theme.palette.font.icon__hover,
    },
  })
);

// ==============================|| SEARCH INPUT ||============================== //

const MessageSend = (props) => {
  const { useHtmlEditor } = props;

  const theme = useTheme();
  const { t } = useTranslation();
  const customization = useSelector((state) => state.customization);
  const socket = useSelector(
    (state) => state.customization.configSettings.socket
  );
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [value, setValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [quillEditor, setQuillEditor] = useState(false);

  //#region useHooks
  React.useEffect(() => {
    setQuillEditor(useHtmlEditor);
  }, [useHtmlEditor]);
  //#endregion

  //#region useFormik
  const [enableValidation, setEnableValidation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      message: "",
    },
    // validationSchema: getYupSchemaFromMetaData(dataForm),
    validateOnChange: enableValidation,
    validateOnBlur: enableValidation,
    onSubmit: (values) => {
      const message = values.message.trim();
      setSubmitting(true);

      if (helpersExtension.isNotNull(message) && currentUser) {
        setSubmitting(false);

        //Encrypt data sent by socket
        const data = encryptHelper.aes.encrypt({
          _id: `${socket.id}${Math.random()}`,
          socketId: socket.id,
          message: message,
          userInfo: currentUser,
          postedOn: new Date().toISOString(),
        });

        socket.emit("liveChat__message", data);
        formik.resetForm();
      } else {
        setSubmitting(false);
      }
    },
  });
  //#endregion

  //#region handle event
  const handleSubmit = (event) => {
    if (typeof event === "object") event.preventDefault();
    if (submitting) return;

    setEnableValidation(true);
    formik.handleSubmit();
  };

  const handleTyping = () =>
    socket.emit(
      "liveChat__typing",
      `${currentUser.detailInfos.aliasName} is typing`
    );

  const handleOnEmojiSelect = (emojiObject) => {
    const prevText = objectExtension.getValue(formik, "values.message");
    formik.setFieldValue("message", prevText + emojiObject.native);
    setShowEmoji(false);
  };

  const handleOnChange = (value) => {
    formik.setFieldValue("message", value);
    setShowEmoji(false);
    // formik.handleChange();
  };
  //#endregion

  //#region render
  const renderQuillEditor = () => {
    return (
      <Grid item className="outline-typing-message">
        <ReactQuillEditor
          className="editor-typing-message"
          toolbar="chatbox"
          onChange={handleOnChange}
          submitHandler={(e) => handleSubmit(e)}
          autoFocus={true}
          placeholder={t("community.app.livechat.type_a_message")}
          value={objectExtension.getValue(formik, "values.message")}
        />
      </Grid>
    );
  };

  const renderInputSend = () => {
    return (
      <OutlineInputStyle
        id="input-typing-message"
        name="message"
        className="outline-typing-message"
        value={objectExtension.getValue(formik, "values.message")}
        onChange={formik.handleChange}
        onKeyDown={handleTyping}
        placeholder={t("community.app.livechat.type_a_message")}
        autoFocus={true}
        startAdornment={
          <InputAdornment position="start" className="adorment-picker">
            {showEmoji ? (
              <>
                <IconMoodHappyFilled
                  className="emoji-picker"
                  stroke={theme.palette.font.icon}
                  size="1.3rem"
                  onClick={() => setShowEmoji((val) => !val)}
                />
                <EmojiPicker
                  onEmojiSelect={handleOnEmojiSelect}
                  theme={customization.mode}
                  locale={_globalVars.locale.lang}
                />
              </>
            ) : (
              <IconMoodSmileFilled
                className="emoji-picker"
                stroke={theme.palette.font.icon}
                size="1.3rem"
                onClick={() => setShowEmoji((val) => !val)}
              />
            )}
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <ButtonBase sx={{ borderRadius: "12px" }} onClick={handleSubmit}>
              <HeaderAvatarStyle
                variant="rounded"
                className="MuiTypography-mediumAvatar MuiTypography-commonAvatar"
              >
                <IconSend stroke={theme.palette.font.icon} size="1.3rem" />
              </HeaderAvatarStyle>
            </ButtonBase>
          </InputAdornment>
        }
        aria-describedby="search-helper-text"
        inputProps={{ "aria-label": "weight" }}
      />
    );
  };
  //#endregion

  return (
    <>
      <Grid item xs={12} sx={{ mr: 1 }}>
        <Box
          className="form"
          component="form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          {quillEditor ? renderQuillEditor() : renderInputSend()}
        </Box>
      </Grid>
    </>
  );
};

export default MessageSend;
