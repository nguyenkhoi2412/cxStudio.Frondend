import "./_backdropSpin.scss";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { backdropSpinState } from "./backdropSpin.reducer";

const IncBackdrop = (props) => {
  //   const [open, setOpen] = React.useState(true);
  const dataState = useSelector(backdropSpinState);
  const [dataSource, setDataSource] = React.useState();

  React.useEffect(() => {
    setDataSource(dataState);
  }, [dataState]);

  const handleClose = () => {
    // setOpen(false);
  };

  const renderSpinProgress =
    dataSource?.type === "pre" || props.open ? (
      <div id={dataSource?.open ? "preloader" : "preloader-none"}></div>
    ) : (
      <CircularProgress color="inherit" />
    );

  return (
    <>
      {dataSource?.open || props.open ? (
        <Backdrop
          open={dataSource?.open || props.open}
          onClick={handleClose}
          className="white"
        >
          {dataSource?.spin || props.open ? renderSpinProgress : <></>}
        </Backdrop>
      ) : (
        <></>
      )}
    </>
  );
};

export default IncBackdrop;
