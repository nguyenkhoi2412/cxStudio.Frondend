import "./_alert.scss";
//#region mui-ui
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const WpAlert = ({ open, message, close, severity = "error" }) => {
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [messageContentAlert, setMessageContentAlert] = React.useState();
  console.log(open);
  React.useEffect(() => {
    setShowMessageAlert(open);
  }, [open]);

  React.useEffect(() => {
    setMessageContentAlert(message);
  }, [message]);

  const handleCloseAlert = () => {
    setShowMessageAlert(false);
    if (typeof close === "function") close();
  };

  return (
    <FormControl fullWidth className="alert-customize">
      <Collapse in={showMessageAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleCloseAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity={severity}
        >
          {messageContentAlert}
        </Alert>
      </Collapse>
    </FormControl>
  );
};

export default React.memo(WpAlert, (props, nextProps) => {
  if (JSON.stringify(props) === JSON.stringify(nextProps)) {
    return true;
  }
});
