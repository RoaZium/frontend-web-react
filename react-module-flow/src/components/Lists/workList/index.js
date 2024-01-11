import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { workList } from "../../../constants/worklist";

export default function WorkList() {
  return (
    <List>
      {workList.map((menu) => {
        return (
          <ListItem key={menu.name} disablePadding>
            <ListItemButton>
              <ListItemText primary={menu.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
