import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle, AccountBox, PersonAddAlt1 } from "@mui/icons-material";

import { AppOpenContext } from "../../App";
import DashboardLayout from "../LayoutContainers/DashboardLayout";
import PasswordChange from "../../components/PasswordChange";
import Policy from "../../components/Policy";

const drawerWidth = 160;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminManagement() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { appOpen, setAppOpen } = React.useContext(AppOpenContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={appOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setAppOpen(true)}
            edge="start"
            sx={{
              marginRight: 2,
              ...(appOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
            }}
          >
            관리자
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/" onClick={handleClose}>
                로그아웃
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={appOpen}>
        <DrawerHeader>
          <IconButton onClick={() => setAppOpen(false)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItemButton component={Link} to="/VisitorManagement">
            <ListItemIcon>
              <PersonAddAlt1 />
            </ListItemIcon>
            <ListItemText
              sx={{
                marginLeft: -2,
              }}
            >
              방문자 관리
            </ListItemText>
          </ListItemButton>
          <ListItemButton component={Link} to="/AdminManagement">
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText
              sx={{
                marginLeft: -2,
              }}
            >
              관라자 설정
            </ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
      <DashboardLayout>
        <Box>
          <Box mb={3}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Box p={2}>
                  <Box p={1} borderRadius={2} boxShadow="3">
                    <Typography variant="h6" fontWeight="bold">
                      관리자 설정
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Policy />
              </Grid>
              <Grid item xs={12}>
                <PasswordChange />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DashboardLayout>
    </Box>
  );
}
