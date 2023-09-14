import { Typography } from "@mui/material";
import HLSCContainer from "../../components/LayoutContainers/H-LS-C-Container";
import HLSCFContainer from "../../components/LayoutContainers/H-LS-C-F-Container";
import LSHCContainer from "../../components/LayoutContainers/LS-H-C-Container";
import MyFlow from "../MyFlow/MyFlow";
import SideBar from "../../components/SideBar/SideBar";

function TestLayout() {
  return (
    <>
      {/* <HLSCContainer></HLSCContainer> */}
      {/* <HLSCFContainer></HLSCFContainer> */}
      {/* <MyFlow /> */}
      <LSHCContainer
        sidebar={<h3>sidebar</h3>}
        header={<h3>header</h3>}
        content={<h3>content</h3>}
      />
    </>
  );
}

export default TestLayout;
