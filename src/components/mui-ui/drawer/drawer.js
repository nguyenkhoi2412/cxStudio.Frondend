import "./_drawer.scss";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Drawer, Grid, IconButton } from "@mui/material";

// project imports
import MainCard from "@components/mui-ui/cards";
import { SnackbarProvider } from "notistack";
import { gridSpacing } from "@constants";
import { CLOSE_DRAWER } from "./drawer.reducer";
import { IconX } from "@tabler/icons-react";

// ==============================|| DRAW FROM MUI UI ||============================== //
const WpDrawer = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const valueState = useSelector((state) => state.muiDrawer);

  // drawer on/off
  const [className, setClassName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState("right");
  const [width, setWidth] = React.useState(360);
  const [height, setHeight] = React.useState(360);
  const [render, setRender] = React.useState(null);
  console.log("sdf");
  //#region useHooks
  React.useEffect(() => {
    setClassName(valueState.className);
    setTitle(valueState.title);
    setOpen(valueState.open);
    setAnchor(valueState.anchor);
    setWidth(valueState.width);
    setHeight(valueState.height);
    setRender(valueState.render);
  }, [valueState.open]);
  //#endregion

  //#region handle events
  const handleCloseDrawer = () => {
    setOpen(false);
    dispatch(CLOSE_DRAWER());
  };
  //#endregion

  //#region render html
  const renderIconClose = (
    <IconButton className="btnClose" onClick={handleCloseDrawer}>
      <IconX />
    </IconButton>
  );

  //#endregion

  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
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
            secondary={title?.length > 0 ? renderIconClose : ""}
          >
            {title?.length === 0 ? renderIconClose : ""}
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                {render}
              </Grid>
            </Grid>
          </MainCard>
        </Drawer>
      </SnackbarProvider>
    </>
  );
});

export default React.memo(WpDrawer, (props, nextProps) => {
  if (JSON.stringify(props) === JSON.stringify(nextProps)) {
    // return true if you don't need re-render
    return true;
  }
});
