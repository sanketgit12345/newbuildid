import React, { useState } from "react";
import "../header/Header.css";
import MuiAppBar from "@mui/material/AppBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import NotificationsAcitveIcon from "@mui/icons-material/NotificationsActive";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { styled } from "@mui/material/styles";
import profileIcon from "../assets/images/profile-img.jpg";
import { useNavigate } from "react-router-dom";

const drawerWidth = 260;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header(props) {

  const [open, setOpen] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const sopen = Boolean(anchorEl);
  const id = sopen ? "simple-popover" : undefined;

  const [profilePic, setProfilepic] = useState(null);
  const popen = Boolean(profilePic);
  const pId = popen ? "simple-popover" : undefined;
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    if (props.openDrawer) {
      props.setOpendrawer(false);
    } else {
      props.setOpendrawer(true);
    }
  };

  const handleClicks = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openMenu = (event) => {
    setProfilepic(event.currentTarget);
  };

  const handleClosemenu = () => {
    setProfilepic(null);
  };

  const onProfileClick = () => {
    navigate("/main/profile");
  };

  const onLogout = () => {
    navigate("/");
  }

  return (
    <AppBar
      position="fixed"
      className="app-bar"
      open={props.openDrawer}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className="menu-icon"
        >
          <MenuIcon style={{ fill: "gray" }} />
        </IconButton>
        <Button variant="contained" style={props.openDrawer === false ? { borderLeft: "1px solid rgba(0, 0, 0, 0.12)" } : {}} className="apps-btn" onClick={handleClicks}>
          Apps
          <KeyboardArrowDownIcon className="dropdown-icon" />
        </Button>
        <Popover
          id={id}
          open={sopen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}>
          <div className="apps-popover">
            <Grid container spacing={2}>
              <Grid item xs={4} lg={4}>
                <Stack
                  spacing={1}
                  className="popover-item"
                  direction="row"
                  alignItems="center">
                  <Stack className="popover-icon">
                    <BusinessCenterIcon />
                  </Stack>
                  <Stack>
                    <Typography noWrap className="app-name">
                      {"Job Postings"}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  className="popover-item"
                  spacing={1}
                  direction="row"
                  alignItems="center">
                  <Stack className="popover-icon">
                    <BusinessCenterIcon />
                  </Stack>
                  <Stack>
                    <Typography noWrap className="app-name">
                      {"Work Buddy"}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  className="popover-item"
                  spacing={1}
                  direction="row"
                  alignItems="center">
                  <Stack className="popover-icon">
                    <BusinessCenterIcon />
                  </Stack>
                  <Stack>
                    <Typography noWrap className="app-name">
                      {"Tikets"}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  className="popover-item"
                  spacing={1}
                  direction="row"
                  alignItems="center">
                  <Stack className="popover-icon">
                    <BusinessCenterIcon />
                  </Stack>
                  <Stack>
                    <Typography noWrap className="app-name">
                      {"Builder Network"}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={4} lg={4}>
                <Stack
                  className="popover-item"
                  spacing={1}
                  direction="row"
                  alignItems="center">
                  <Stack className="popover-icon">
                    <BusinessCenterIcon />
                  </Stack>
                  <Stack>
                    <Typography noWrap className="app-name">
                      {"Manufacturers"}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  className="popover-item"
                  spacing={1}
                  direction="row"
                  alignItems="center">
                  <Stack className="popover-icon">
                    <BusinessCenterIcon />
                  </Stack>
                  <Stack>
                    <Typography noWrap className="app-name">
                      {"Trades"}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  className="popover-item"
                  spacing={1}
                  direction="row"
                  alignItems="center">
                  <Stack className="popover-icon">
                    <BusinessCenterIcon />
                  </Stack>
                  <Stack>
                    <Typography noWrap className="app-name">
                      {"Carpool"}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  className="popover-item"
                  spacing={1}
                  direction="row"
                  alignItems="center">
                  <Stack className="popover-icon">
                    <BusinessCenterIcon />
                  </Stack>
                  <Stack>
                    <Typography noWrap className="app-name">
                      {"Resume Builder"}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={4} lg={4}>
                <Stack
                  className="popover-item"
                  spacing={1}
                  direction="row"
                  alignItems="center">
                  <Stack className="popover-icon">
                    <BusinessCenterIcon />
                  </Stack>
                  <Stack>
                    <Typography noWrap className="app-name">
                      {"Montages"}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  className="popover-item"
                  spacing={1}
                  direction="row"
                  alignItems="center">
                  <Stack className="popover-icon">
                    <BusinessCenterIcon />
                  </Stack>
                  <Stack>
                    <Typography noWrap className="app-name">
                      {"Companies"}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  className="popover-item"
                  spacing={1}
                  direction="row"
                  alignItems="center">
                  <Stack className="popover-icon">
                    <BusinessCenterIcon />
                  </Stack>
                  <Stack>
                    <Typography noWrap className="app-name">
                      {"Product"}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  className="popover-item"
                  spacing={1}
                  direction="row"
                  alignItems="center">
                  <Stack className="popover-icon">
                    <BusinessCenterIcon />
                  </Stack>
                  <Stack>
                    <Typography noWrap className="app-name">
                      {"BuySell"}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </div>
        </Popover>
        <div style={{ flexGrow: "1" }} />
        <Stack
          direction="row"
          style={{ alignItems: "center", gap: "5px" }}
          spacing={2}>
          <QuestionAnswerIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
          <NotificationsAcitveIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
          <IconButton onClick={openMenu}>
            <Avatar aria-describedby={id} alt="Remy Sharp" src={profileIcon} />
          </IconButton>
        </Stack>
        <Popover
          id={pId}
          open={popen}
          anchorEl={profilePic}
          onClose={handleClosemenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}>
          <MenuItem onClick={onProfileClick}>
            <ListItemIcon>
              <AccountCircleIcon fontSize={"small"} />
            </ListItemIcon>
            <ListItemText style={{ paddingRight: "25px" }}>
              Profile
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={() =>onLogout()}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}
