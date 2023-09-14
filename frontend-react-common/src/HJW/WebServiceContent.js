import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { TreeItemStyle } from "./SxProps.jsx";
import { Contents1, Contents2 } from "./Contents";

//팝업 내용
export function PopUpContent() {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={["1"]}
      sx={TreeItemStyle}
    >
      <TreeItem nodeId="1" label="기본" sx={TreeItemStyle}>
        <Contents1 />
      </TreeItem>
      <TreeItem nodeId="2" label="고급" sx={TreeItemStyle}>
        <Contents2 />
      </TreeItem>
    </TreeView>
  );
}
