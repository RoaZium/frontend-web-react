import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

const data: RenderTree = {
  id: "root",
  name: "실시간",
  children: [
    {
      id: "01",
      name: "출입",
    },
    {
      id: "02",
      name: "출입문",
    },
    {
      id: "03",
      name: "파티션(경비)",
    },
    {
      id: "04",
      name: "경보(알람)",
    },
  ],
};

export default function RichObjectTreeView() {
  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
        overflowY: "auto",
        bgcolor: "orange",
      }}
    >
      {renderTree(data)}
    </TreeView>
  );
}
