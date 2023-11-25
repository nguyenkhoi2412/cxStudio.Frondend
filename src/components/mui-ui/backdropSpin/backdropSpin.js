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
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setDataSource(dataState);
    setIsOpen(dataState.open);
  }, [dataState]);

  React.useEffect(() => {
    if (props?.open) {
      setIsOpen(props?.open);
    }
  }, [props]);

  const handleClose = () => {
    // setOpen(false);
  };

  const renderSpinProgress = () => {
    if (dataSource?.type === "pre") {
      return <div id={isOpen ? "preloader" : "preloader-none"}></div>;
    } else if (dataSource?.spin === true) {
      return <CircularProgress color="inherit" />;
    }
  };

  return (
    <>
      {isOpen ? (
        <Backdrop open={true} onClick={handleClose} className="white">
          {renderSpinProgress()}
        </Backdrop>
      ) : (
        <></>
      )}
    </>
  );
};

export default IncBackdrop;
