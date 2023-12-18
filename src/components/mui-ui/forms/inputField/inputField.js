import "./_inputField.scss";
import * as React from "react";
import { stringHelper } from "@utils/string.helper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import _globalVars from "@constants/variables";

const regexEditor = _globalVars.regexEditor;
const regexXSS = _globalVars.regexXSS;
const InputField = (props) => {
  const [dataValue, setDataValue] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showClearText, setShowClearText] = React.useState(false);
  const [isPasswordField, setIsPasswordField] = React.useState(false);

  let hasError = false;
  if (typeof props.error == "boolean") {
    hasError = props.error;
  }
  if (typeof props.error == "string") {
    hasError = true;
  }

  //#region useEffect
  React.useEffect(() => {
    setIsPasswordField(props.type === "password");
  }, [props]);

  React.useEffect(() => {
    setDataValue(props.value);
  }, [props.value]);

  React.useEffect(() => {
    setShowClearText(dataValue?.length > 0 && !props.disabled);
  }, [dataValue]);
  //#endregion

  //#region handle events
  const togglePasswordHide = () => {
    setShowPassword(!showPassword);
  };

  const clearDataValue = (e) => {
    setDataValue("");
    e.target.value = "";
    handleOnChangeInputField(e);
  };

  const handleOnChangeInputField = (e) => {
    props.onChange(e);

    let val = e.target.value;
    setDataValue(val);
    val = stringHelper.stripedHtml(val);

    if (props.preventXSS) {
      val = val.replace(regexXSS, "");
    }

    if (props.setValue instanceof Function) {
      props.setValue(props.name, val);
    }
  };
  //#endregion

  //#region render
  const renderIconEndAdornment = () => {
    switch (props.type) {
      case "password":
        return renderIconVisiblePassword();
      case "text":
        return renderIconClearIcon();
      default:
        return <></>;
    }
  };

  const renderIconVisiblePassword = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          className="icon-password"
          aria-label="toggle password visibility"
          onClick={togglePasswordHide}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };

  const renderIconClearIcon = () => {
    return showClearText ? (
      <InputAdornment position="end">
        <IconButton
          className="icon-cleartext"
          aria-label="toggle cleartext visibility"
          onClick={clearDataValue}
        >
          <ClearIcon />
        </IconButton>
      </InputAdornment>
    ) : (
      <></>
    );
  };
  //#endregion

  const xs = props.xs || 12;
  const sm = props.sm || xs;
  const md = props.md || sm;

  return (
    <Grid item xs={xs} sm={sm} md={md} className="field-container">
      {/* <InputLabel htmlFor='my-input'>Email address</InputLabel> */}
      <TextField
        margin="normal"
        fullWidth
        disabled={props.disabled}
        InputProps={{
          tabIndex: props.tabIndex,
          endAdornment: renderIconEndAdornment(),
        }}
        id={props.id}
        type={
          isPasswordField ? (showPassword ? "text" : "password") : props.type
        }
        label={props.label}
        name={props.name}
        value={dataValue}
        onChange={handleOnChangeInputField}
        error={hasError}
        helperText={props.helperText}
        className="form-control"
      />
      {/* <FormHelperText id='my-helper-text'>We'll never share your email.</FormHelperText> */}
    </Grid>
  );
};

export default React.memo(InputField, (props, nextProps) => {
  if (
    props.value === nextProps.value &&
    props.id === nextProps.id &&
    props.error === nextProps.error
  ) {
    // return true if you don't need re-render
    return true;
  }
});
