import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Drawer from "@mui/material/Drawer";

const drawerWidth = 200;

const drawerCss = {
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
};

function HeaderAppbar() {
  return (
    <AppBar position="static" color="warning">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Flow
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

function LeftMenu({ children }) {
  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth } }}>
      <Drawer sx={drawerCss} variant="permanent" anchor="left">
        <Typography variant="h4" component="div">
          Category
        </Typography>
        <Divider />
        {children}
      </Drawer>
    </Box>
  );
}

function MainContainer() {
  return <Box sx={{ bgcolor: "#bdbdbd" }}></Box>;
}

function BottomFooter() {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={5}
    >
      <BottomNavigation>
        <BottomNavigationAction label="하단" />
        <BottomNavigationAction label="푸터" />
        <BottomNavigationAction label="영역" />
      </BottomNavigation>
    </Paper>
  );
}

function LayoutBase({ children }) {
  return <Box>{children}</Box>;
}

export { HeaderAppbar, LeftMenu, MainContainer, BottomFooter, LayoutBase };
