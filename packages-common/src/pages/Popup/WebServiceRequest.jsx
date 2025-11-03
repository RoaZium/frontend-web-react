import React from "react";
import {
  Button,
  ButtonGroup,
  Divider,
  IconButton,
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
import { ContentChange } from "../../HJW/ContentChange";

export default function WebServiceRequest() {
  const { isPopupOpen, setIsPopupOpen } = useStore();

  const handleIsPopupOpen = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <Box sx={OutPopStyle}>
      <Box sx={InPopTitleStyle}>
        <Typography sx={{ m: 2 }}>
          웹 서비스 호출
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
          웹 서비스를 호출하고 응답 텍스트를 저장합니다.
        </Typography>
      </Box>
      <Box sx={InPopContentStyle}>
        <Typography sx={{ m: 2, height: "2vh" }}>매개 변수 선택</Typography>
        <Box sx={{ m: 2 }}>
          <ContentChange />
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
