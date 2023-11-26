import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const IncSnackBar = () => {
  const snackBarData = useSelector((state) => state.muiSnackBar);
  const [open, setOpen] = React.useState(false);
  const [anchorOrigin, setAnchorOrigin] = React.useState({
    vertical: "top",
    horizontal: "center",
  });

  React.useEffect(() => {
    if (snackBarData?.open) {
      setOpen(snackBarData.open);
    }

    if (snackBarData?.anchorOrigin) {
      setAnchorOrigin(snackBarData?.anchorOrigin);
    }
  }, [snackBarData]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const renderSnackBar = React.useMemo(() => {
    return (
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={open}
        autoHideDuration={snackBarData?.autoHideDuration || 3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarData?.severity || "success"}
          sx={{ width: "100%" }}
        >
          {snackBarData?.content || "This is a your message!"}
        </Alert>
      </Snackbar>
    );
  }, [open]);

  return renderSnackBar;
};

export default IncSnackBar;
