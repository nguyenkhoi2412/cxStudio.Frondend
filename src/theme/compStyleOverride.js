const componentStyleOverrides = (theme) => {
  const bgColor = theme.colors?.backgroundContainerMain;
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordBreak: "break-all",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: "4px",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: `${theme?.customization?.borderRadius}px`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: theme.colors?.textSubTitle1,
          padding: "24px",
        },
        title: {
          fontSize: "1.125rem",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.colors?.textDefault,
          paddingTop: "10px",
          paddingBottom: "10px",
          "&.Mui-selected": {
            color: theme.colors?.textMenuSelected,
            backgroundColor: theme.colors?.bgMenuSelected,
            "&:hover": {
              backgroundColor: theme.colors?.bgMenuSelected,
            },
            "& .MuiListItemIcon-root": {
              color: theme.colors?.textMenuSelected,
            },
          },
          "&:hover": {
            backgroundColor: theme.colors?.bgMenuSelected,
            color: theme.color?.textMenuSelected,
            "& .MuiListItemIcon-root": {
              color: theme.color?.textMenuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.colors?.textDefault,
          minWidth: "36px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.textSubTitle1,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.textSubTitle1,
          "&::placeholder": {
            color: theme.colors.textSecondary,
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: bgColor,
          borderRadius: `${theme?.customization?.borderRadius}px`,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.colors?.grey400,
          },
          "&:hover $notchedOutline": {
            borderColor: theme.colors?.primaryLight,
          },
          "&.MuiInputBase-multiline": {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: bgColor,
          padding: "15.5px 14px",
          borderRadius: `${theme?.customization?.borderRadius}px`,
          "&.MuiInputBase-inputSizeSmall": {
            padding: "10px 14px",
            "&.MuiInputBase-inputAdornedStart": {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `${theme?.customization?.borderRadius}px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: theme.colors?.grey300,
          },
        },
        mark: {
          backgroundColor: theme.colors?.paper,
          width: "4px",
        },
        valueLabel: {
          color: theme?.colors?.primaryLight,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.colors?.colorDivider,
          opacity: 1,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.colors?.primaryDark,
          background: theme.colors?.primary200,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&.MuiChip-deletable .MuiChip-deleteIcon": {
            color: "inherit",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.colors?.paper,
          background: theme.colors?.grey700,
        },
      },
    },
  };
};

export default componentStyleOverrides;
