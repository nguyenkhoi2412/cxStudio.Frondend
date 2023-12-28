import AnimateButton from "./animateButton";
import { Button, CircularProgress } from "@mui/material";

const LoadingButton = React.forwardRef(
  (
    {
      text = "No text",
      disabled = false,
      spin = false,
      size = "large",
      variant = "contained",
      animate = true,
      ...args
    },
    ref
  ) => {
    //#region render components
    const RenderAnimateButton = () => {
      return <AnimateButton>{RenderButton()}</AnimateButton>;
    };

    const RenderButton = () => {
      return (
        <Button
          {...args}
          disableElevation
          disabled={disabled}
          fullWidth
          size={size}
          variant={variant}
          type="submit"
        >
          {spin ? (
            <CircularProgress size={32} thickness={4} color="inherit" />
          ) : (
            text
          )}
        </Button>
      );
    };
    //#endregion

    return <>{animate ? RenderAnimateButton() : RenderButton()}</>;
  }
);

export default React.memo(LoadingButton, (props, nextProps) => {
  if (JSON.stringify(props) === JSON.stringify(nextProps)) {
    // return true if you don't need re-render
    return true;
  }
});
