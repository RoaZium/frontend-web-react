import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  OutPopStyle,
  InPopTitleStyle,
  InPopInfoStyle,
  InPopContentStyle,
  InPopBottomStyle,
} from "../../HJW/SxProps";
import { useStore } from "../../states/store";
import CloseIcon from "@mui/icons-material/Close";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { TreeItemStyle } from "../../HJW/SxProps.jsx";
import { TextFieldProps } from "../../HJW/Props.jsx";
import { PostFlow } from "../../apis/Flow";

export default function WebServiceRequest() {
  const {
    isPopupOpen,
    setIsPopupOpen,
    sigthCubeCCServerIP,
    setSightCubeCCServerIP,
    sigthCubeCCServerPort,
    setSightCubeCCServerPort,
    flowModel,
    setFlowModel,
  } = useStore();

  // const [ip, setIP] = useState("");

  const handleInputChangeCCServerIP = (event) => {
    const newFlowModel = {
      ...flowModel,
      0: {
        ...flowModel[0],
        flow_list: [
          {
            ...flowModel[0].flow_list[0],
            properties: {
              ...flowModel[0].flow_list[0].properties,
              ip: event.target.value,
            },
          },
        ],
      },
    };
    setFlowModel(newFlowModel);
  };

  const handleInputChangeCCServerPort = (event) => {
    console.log("Port:" + event.target.value);
  };

  const handleIsPopupOpen = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <Box sx={OutPopStyle}>
      <Box sx={InPopTitleStyle}>
        <Typography variant="body2" sx={{ m: 2 }}>
          SightCube CC Server
        </Typography>
        <Typography variant="h6" sx={{ m: 2 }}>
          <IconButton
            sx={{ float: "right" }}
            size="small"
            edge="end"
            onClick={handleIsPopupOpen}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
      </Box>
      <Box sx={InPopInfoStyle}>
        <Typography variant="body2" sx={{ m: 2 }}>
          SightCube CC Server 연결합니다.
        </Typography>
      </Box>
      <Box sx={InPopContentStyle}>
        <Box sx={{ m: 2 }}>
          <TextField
            {...TextFieldProps}
            label="IP"
            placeholder="IP을 입력하세요."
            value={flowModel[0].flow_list[0].properties.ip}
            onChange={handleInputChangeCCServerIP}
          />
          <TextField
            {...TextFieldProps}
            label="Port"
            placeholder="Port를 입력하세요."
            value={flowModel[0].flow_list[0].properties.port}
            onChange={handleInputChangeCCServerPort}
          />
          <TextField
            {...TextFieldProps}
            label="Topic"
            placeholder="Topic을 입력하세요"
            value={flowModel[0].flow_list[0].properties.topic}
            onChange={handleInputChangeCCServerPort}
          />
        </Box>
      </Box>
      <Box sx={InPopBottomStyle}>
        <Divider />
        <Box sx={{ m: 2 }}>
          <Button
            onClick={() => console.log(flowModel[0].flow_list[0].properties.ip)}
          >
            오류
          </Button>
          <ButtonGroup color="warning" sx={{ float: "right" }}>
            <Button variant="contained" onClick={PostFlow}>
              저장
            </Button>
            <Button variant="outlined" onClick={handleIsPopupOpen}>
              취소
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}
