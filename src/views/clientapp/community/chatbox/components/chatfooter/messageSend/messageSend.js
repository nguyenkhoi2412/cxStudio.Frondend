import "./_messageSend.scss";
import { useState } from "react";
import { helpersExtension, objectExtension } from "@utils/helpersExtension";
import encryptHelper from "@utils/encrypt.helper";
import { useFormik } from "formik";

// material-ui
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

//#region reducer
import { useSelector } from "react-redux";
//#endregion

// third-party
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";

// project imports
import Transitions from "@components/mui-ui/extended/transitions";

// assets
import {
  IconAdjustmentsHorizontal,
  IconSearch,
  IconX,
  IconBrandWechat,
  IconSend,
} from "@tabler/icons-react";
import { shouldForwardProp } from "@mui/system";

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

const MessageSend = () => {
  const theme = useTheme();
  const socket = useSelector(
    (state) => state.customization.configSettings.socket
  );
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [value, setValue] = useState("");

  //#region useFormik
  const [enableValidation, setEnableValidation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      message: value,
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
        });

        socket.emit("liveChat__message", data);
        formik.resetForm();
      }
    },
  });
  //#endregion

  //#region handle event
  const handleSubmit = (event) => {
    event.preventDefault();

    if (submitting) return;

    setEnableValidation(true);
    formik.handleSubmit();
  };

  const handleTyping = () =>
    socket.emit(
      "liveChat__typing",
      `${currentUser.detailInfos.aliasName} is typing`
    );
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
          <OutlineInputStyle
            id="input-typing-message"
            name="message"
            className="outline-typing-message"
            value={objectExtension.getValue(formik, "values.message")}
            onChange={formik.handleChange}
            onKeyDown={handleTyping}
            placeholder="Type a message"
            startAdornment={
              <InputAdornment position="start">
                <IconBrandWechat
                  stroke={theme.palette.font.icon}
                  size="1.3rem"
                  color={theme.palette.grey[500]}
                />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <ButtonBase
                  sx={{ borderRadius: "12px" }}
                  onClick={handleSubmit}
                >
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
        </Box>
      </Grid>
    </>
  );
};

export default MessageSend;
