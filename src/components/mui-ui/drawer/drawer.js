import "./_drawer.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Drawer, Grid, Typography } from "@mui/material";

// project imports
import MainCard from "@components/mui-ui/cards";
import SubCard from "@components/mui-ui/cards/subCard";
import AnimateButton from "@components/mui-ui/extended/animateButton";
import {
  SET_BORDER_RADIUS,
  SET_MODE,
  SET_FONT_FAMILY,
} from "@reduxproviders/berry/actions";
import { gridSpacing } from "@constants";
import { CLOSE_DRAWER } from "./drawer.reducer";

// concat 'px'
function valueText(value) {
  return `${value}px`;
}

// ==============================|| DRAW FROM MUI UI ||============================== //
const WpDrawer = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.muiDrawer);

  // drawer on/off
  const [className, setClassName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState("right");
  const [width, setWidth] = React.useState(280);
  const [height, setHeight] = React.useState(280);

  //#region useHooks
  React.useEffect(() => {
    setClassName(dataState.className);
    setTitle(dataState.title);
    setOpen(dataState.open);
    setAnchor(dataState.anchor);
    setWidth(dataState.width);
    setHeight(dataState.height);
  }, [dataState.open]);
  //#endregion

  //#region handle events
  const handleCloseDrawer = () => {
    setOpen(false);
    dispatch(CLOSE_DRAWER());
  };
  //#endregion

  return (
    <>
      <Drawer
        ref={ref}
        anchor={anchor}
        onClose={handleCloseDrawer}
        open={open}
        className={"wp__drawer" + (className !== "" ? " " + className : "")}
        PaperProps={{
          sx: {
            width: anchor === "top" || anchor === "bottom" ? "auto" : width,
            height: anchor === "left" || anchor === "right" ? "auto" : height,
          },
        }}
      >
        <MainCard
          title={title}
          // secondary={
          //   <SecondaryAction link="https://next.material-ui.com/system/typography/" />
          // }
        >
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              abc
            </Grid>
          </Grid>
        </MainCard>
      </Drawer>
    </>
  );
});

export default WpDrawer;
