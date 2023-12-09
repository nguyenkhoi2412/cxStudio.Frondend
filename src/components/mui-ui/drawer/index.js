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

// concat 'px'
function valueText(value) {
  return `${value}px`;
}

// ==============================|| DRAW FROM MUI UI ||============================== //
const WpDrawer = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // drawer on/off
  const [open, setOpen] = React.useState(false);

  //#region useHooks
  React.useEffect(() => {
    setOpen(props?.open);
  }, [props?.open]);
  //#endregion

  //#region handle events
  const handleToggle = () => {
    setOpen(!open);
  };
  //#endregion

  return (
    <>
      <Drawer
        ref={ref}
        anchor="right"
        onClose={handleToggle}
        open={open}
        className={
          "wp__drawer" + (props?.className ? "" : " " + props.className)
        }
        PaperProps={{
          sx: {
            width: 280,
          },
        }}
      >
        <MainCard
          title="general"
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
