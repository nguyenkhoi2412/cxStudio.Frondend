import "./_FadeAnimation.scss";
import {
  Grow,
  Fade,
  Collapse,
  Slide,
  Zoom,
  CircularProgress,
} from "@mui/material";

const FadeAnimation = ({
  children,
  isOpen = false,
  type = "fade",
  timeout = 1000,
  loading = false,
  ...args
}) => {
  const animation = {
    fade: (
      <Fade {...(isOpen ? { timeout: timeout } : {})} in={isOpen} {...args}>
        {children}
      </Fade>
    ),

    grow: (
      <Grow {...(isOpen ? { timeout: timeout } : {})} in={isOpen} {...args}>
        {children}
      </Grow>
    ),

    zoom: (
      <Zoom
        in={isOpen}
        style={{ FadeAnimationDelay: isOpen ? "400ms" : "0ms" }}
        {...args}
      >
        {children}
      </Zoom>
    ),

    slide: (
      <Slide
        direction="down"
        in={isOpen}
        mountOnEnter
        unmountOnExit
        {...(isOpen ? { timeout: timeout } : {})}
        {...args}
      >
        {children}
      </Slide>
    ),

    //* orientation="horizontal/vertical"
    collapse: (
      <Collapse {...(isOpen ? { timeout: timeout } : {})} in={isOpen} {...args}>
        {children}
      </Collapse>
    ),
  };

  return animation[type];
};

export default FadeAnimation;
