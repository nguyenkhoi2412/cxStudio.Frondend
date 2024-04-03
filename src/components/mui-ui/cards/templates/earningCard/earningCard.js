import './_earningCard.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { gridSpacing } from '@constants';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from '@components/mui-ui/cards';
import EarningCardLoading from '@components/mui-ui/cards/templates/earningCardLoading';

// assets
import EarningIcon from '@assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

// const CardWrapper = styled(MainCard)(({ theme }) => ({
//   backgroundColor: theme.palette.secondary.dark,
//   color: '#fff',
//   overflow: 'hidden',
//   position: 'relative',
//   '&:after': {
//     content: '""',
//     position: 'absolute',
//     width: 210,
//     height: 210,
//     background: theme.palette.secondary[800],
//     borderRadius: '50%',
//     top: -85,
//     right: -95,
//     [theme.breakpoints.down('sm')]: {
//       top: -105,
//       right: -140,
//     },
//   },
//   '&:before': {
//     content: '""',
//     position: 'absolute',
//     width: 210,
//     height: 210,
//     background: theme.palette.secondary[800],
//     borderRadius: '50%',
//     top: -125,
//     right: -15,
//     opacity: 0.5,
//     [theme.breakpoints.down('sm')]: {
//       top: -155,
//       right: -70,
//     },
//   },
// }));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({
  isLoading,
  cssClass = null,
  title = '',
  content = '',
  iconToolbox = null,
  avatarComponent = null,
  secondary = 'primary' //primary/secondary
}) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  //#region handle events
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //#endregion

  //#region render content
  const renderTopMenuItem = () => {
    return (
      <>
        <Avatar
          variant="rounded"
          className="menu-earning-card MuiTypography-commonAvatar MuiTypography-mediumAvatar"
          sx={{
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.secondary[200],
            zIndex: 1
          }}
          aria-controls="menu-earning-card"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHorizIcon fontSize="inherit" />
        </Avatar>
        <Menu
          id="menu-earning-card"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          variant="selectedMenu"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem onClick={handleClose}>
            <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
          </MenuItem>
        </Menu>
      </>
    );
  };

  const renderTopToolbox = () => {
    return (
      <>
        <Grid item className="toolbox">
          <Grid container justifyContent="space-between">
            <Grid item>
              <Avatar
                className="icon-card MuiTypography-commonAvatar MuiTypography-largeAvatar"
                variant="rounded"
              >
                {iconToolbox !== null ? (
                  iconToolbox
                ) : (
                  <img src={EarningIcon} alt="Notification" />
                )}
              </Avatar>
            </Grid>
            <Grid item>{renderTopMenuItem()}</Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  const renderMainContent = () => {
    return (
      <>
        <Grid item className="main-content">
          <Grid container alignItems="center">
            <Grid item>
              <Typography className="earning-price">
                {content !== '' ? content : '$500.00'}
              </Typography>
            </Grid>
            <Grid item>
              {avatarComponent !== null ? (
                avatarComponent
              ) : (
                <Avatar className="icon-direction MuiTypography-commonAvatar MuiTypography-smallAvatar">
                  <ArrowUpwardIcon
                    fontSize="inherit"
                    sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }}
                  />
                </Avatar>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ mb: 1.25 }} className="sub-content">
          <Typography className="text">{title}</Typography>
        </Grid>
      </>
    );
  };
  //#endregion

  return (
    <>
      {isLoading ? (
        <EarningCardLoading />
      ) : (
        <MainCard
          // title="general"
          className={
            `template-earning-card` +
            (cssClass !== null ? ' ' + cssClass : '') +
            (secondary !== null ? ' ' + secondary : '')
          }
          // contentClass="workspace"
          // secondary={
          //   <SecondaryAction link="https://next.material-ui.com/system/typography/" />
          // }
        >
          <Grid container spacing={gridSpacing} direction={'row'}>
            {/* <CardWrapper border={false} content={false}> */}
            <Box>
              <Grid container direction="column">
                {renderTopToolbox()}
                {renderMainContent()}
              </Grid>
            </Box>
            {/* </CardWrapper> */}
          </Grid>
        </MainCard>
      )}
    </>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool
};

export default React.memo(EarningCard, (props, nextProps) => {
  if (JSON.stringify(props) === JSON.stringify(nextProps)) {
    // return true if you don't need re-render
    return true;
  }
});
