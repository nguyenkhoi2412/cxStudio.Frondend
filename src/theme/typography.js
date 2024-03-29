/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

const themeTypography = (theme) => {
  return {
    fontFamily: theme?.customization?.fontFamily,
    // h6: {
    //   fontWeight: 500,
    //   color: theme.colors?.textHeading,
    //   fontSize: "0.75rem",
    // },
    // h5: {
    //   fontSize: "0.875rem",
    //   color: theme.colors?.textHeading,
    //   fontWeight: 500,
    // },
    // h4: {
    //   fontSize: "1rem",
    //   color: theme.colors?.textHeading,
    //   fontWeight: 600,
    // },
    // h3: {
    //   fontSize: "1.25rem",
    //   color: theme.colors?.textHeading,
    //   fontWeight: 600,
    // },
    // h2: {
    //   fontSize: "1.5rem",
    //   color: theme.colors?.textHeading,
    //   fontWeight: 700,
    // },
    // h1: {
    //   fontSize: "2.125rem",
    //   color: theme.colors?.textHeading,
    //   fontWeight: 700,
    // },
    // subtitle1: {
    //   fontSize: "0.875rem",
    //   fontWeight: 500,
    //   color: theme.colors?.heading,
    // },
    // subtitle2: {
    //   fontSize: "0.75rem",
    //   fontWeight: 400,
    //   color: theme.colors?.textSubTitle,
    // },
    // caption: {
    //   fontSize: "0.75rem",
    //   color: theme.colors?.textSubTitle,
    //   fontWeight: 400,
    // },
    // overline: {
    //   color: theme.colors?.heading,
    //   fontWeight: 400,
    // },
    // body1: {
    //   fontSize: "0.875rem",
    //   fontWeight: 400,
    //   lineHeight: "1.334em",
    //   color: theme.colors?.textDefault,
    // },
    // body2: {
    //   letterSpacing: "0em",
    //   fontWeight: 400,
    //   lineHeight: "1.5em",
    //   color: theme.colors?.textDefault,
    // },
    // button: {
    //   color: theme.colors?.textSecondary,
    //   textTransform: "capitalize",
    // },
    // customInput: {
    //   marginTop: 1,
    //   marginBottom: 1,
    //   "& > label": {
    //     top: 23,
    //     left: 0,
    //     color: theme.grey500,
    //     '&[data-shrink="false"]': {
    //       top: 5,
    //     },
    //   },
    //   "& > div > input": {
    //     padding: "30.5px 14px 11.5px !important",
    //   },
    //   "& legend": {
    //     display: "none",
    //   },
    //   "& fieldset": {
    //     top: 0,
    //   },
    // },
    mainContent: {
      backgroundColor: theme.colors?.backgroundContainerMain,
      color: theme.colors?.textDefault,
      width: "100%",
      minHeight: "calc(100vh - 88px)",
      flexGrow: 1,
      padding: "20px",
      marginTop: "88px",
      marginRight: "20px",
      borderRadius: `${theme?.customization?.borderRadius}px`,
    },
    // menuCaption: {
    //   fontSize: "0.875rem",
    //   fontWeight: 500,
    //   color: theme.colors?.textHeading,
    //   padding: "6px",
    //   textTransform: "capitalize",
    //   marginTop: "10px",
    // },
    // subMenuCaption: {
    //   fontSize: "0.6875rem",
    //   fontWeight: 500,
    //   color: theme.colors?.textSecondary,
    //   textTransform: "capitalize",
    // },
    // commonAvatar: {
    //   cursor: "pointer",
    //   borderRadius: "8px",
    // },
    // smallAvatar: {
    //   width: "22px",
    //   height: "22px",
    //   fontSize: "1rem",
    // },
    // mediumAvatar: {
    //   width: "34px",
    //   height: "34px",
    //   fontSize: "1.2rem",
    // },
    // largeAvatar: {
    //   width: "44px",
    //   height: "44px",
    //   fontSize: "1.5rem",
    // },
  };
};

export default themeTypography;
