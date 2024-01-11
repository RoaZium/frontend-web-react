import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AccessibleIcon from "@mui/icons-material/Accessible";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ElderlyIcon from "@mui/icons-material/Elderly";
import Visitor01 from "../src/layouts/visitors/Visitor01";
import Visitor02 from "../src/layouts/visitors/Visitor02";
import Visitor03 from "../src/layouts/visitors/Visitor03";
import Visitor04 from "../src/layouts/visitors/Visitor04";
import Visitor05 from "../src/layouts/visitors/Visitor05";

const routes = [
  {
    type: "collapse",
    name: "Visitor01",
    key: "visitor01",
    icon: <AccessibilityNewIcon />,
    route: "/Visitor01",
    component: <Visitor01 />,
  },
  {
    type: "collapse",
    name: "Visitor02",
    key: "visitor02",
    icon: <AccessibleIcon />,
    route: "/Visitor02",
    component: <Visitor02 />,
  },
  {
    type: "collapse",
    name: "Visitor03",
    key: "visitor03",
    icon: <CoPresentIcon />,
    route: "/Visitor03",
    component: <Visitor03 />,
  },
  {
    type: "collapse",
    name: "Visitor04",
    key: "visitor04",
    icon: <DirectionsRunIcon />,
    route: "/Visitor04",
    component: <Visitor04 />,
  },
  {
    type: "collapse",
    name: "Visitor05",
    key: "visitor05",
    icon: <ElderlyIcon />,
    route: "/Visitor05",
    component: <Visitor05 />,
  },
];

export default routes;
