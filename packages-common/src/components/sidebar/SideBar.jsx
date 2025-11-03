import React from "react";

import { Drawer } from "@mui/material";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import SDTreeView from "../TreeView/index";

const drawerWidth = 220;

export default function SideBar(params) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ bgcolor: "orange" }} />
      <Divider />
      <SDTreeView />
    </Drawer>
  );
}
