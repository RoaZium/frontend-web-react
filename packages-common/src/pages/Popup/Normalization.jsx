import React from "react";
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

export default function Normalization() {
  const { isPopupOpen, setIsPopupOpen } = useStore();

  const handleIsPopupOpen = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <Box sx={OutPopStyle}>
      <Box sx={InPopTitleStyle}>
        <Typography sx={{ m: 2 }}>데이터 정규화</Typography>
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
          SightCube 데이터 정규화 합니다.
        </Typography>
      </Box>
      <Box sx={InPopContentStyle}>
        <Typography sx={{ m: 2, height: "2vh" }}>연결</Typography>
        <Box sx={{ m: 2 }}>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={["1"]}
            sx={TreeItemStyle}
          >
            <TreeItem nodeId="1" label="기본" sx={TreeItemStyle}>
              <div>
                <TextField
                  {...TextFieldProps}
                  multiline
                  rows={4}
                  label="정규표현식"
                />
              </div>
            </TreeItem>
          </TreeView>
        </Box>
      </Box>
      <Box sx={InPopBottomStyle}>
        <Divider />
        <Box sx={{ m: 2 }}>
          <Button>오류</Button>
          <ButtonGroup color="warning" sx={{ float: "right" }}>
            <Button variant="contained">저장</Button>
            <Button variant="outlined" onClick={handleIsPopupOpen}>
              취소
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}
