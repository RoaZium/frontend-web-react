import React, { useState } from "react";
import BaseWireFrame from "../WireFrame";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SendIcon from "@mui/icons-material/Send";

import "../../App.css";

import Modal from "@mui/material/Modal";
import { useStore } from "../../states/store";
import SDSideBar from "../../components/SideBar/SideBar";
import WebServiceRequest from "../Popup/WebServiceRequest";
import Partition from "../Popup/Partition";
import Normalization from "../Popup/Normalization";
import MenuIcon from "@mui/icons-material/Menu";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useNavigate } from "react-router-dom";
import { PostFlow } from "../../apis/Flow";

export default function Template01() {
  const navigate = useNavigate();

  const {
    isPopupOpen,
    setIsPopupOpen,
    popupMode,
    setPopupMode,
    flowModel,
    setFlowModel,
  } = useStore();

  const handleIsPopupOpen = (code) => {
    setIsPopupOpen(!isPopupOpen);
    setPopupMode(code);
    console.log(flowModel);
  };

  function ModalContent() {
    switch (popupMode) {
      case 1:
        return <Partition />;
      case 2:
        return <Normalization />;
      case 3:
        return <WebServiceRequest />;
      default:
        return <WebServiceRequest />;
    }
  }

  return (
    <BaseWireFrame>
      <div className="flex-container">
        <div className="main">
          <div
            className="sidebar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SDSideBar />
          </div>
          <div
            className="content"
            style={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "stretch",
            }}
          >
            <Grid container>
              <Grid item xs={12} sx={{ height: "65px" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <AppBar position="static">
                    <Toolbar disableGutters={true}>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                      >
                        <MenuIcon />
                      </IconButton>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={PostFlow}
                      >
                        <PlayCircleFilledIcon />
                      </IconButton>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                      >
                        <StopCircleIcon />
                      </IconButton>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                      ></Typography>
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => navigate("/")}
                      >
                        Logout
                      </Button>
                    </Toolbar>
                  </AppBar>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ height: "100%" }}>
                <List>
                  {[
                    {
                      code: 1,
                      index: 1,
                      name: "SightCube 연결",
                      remark: "SightCube 서비스 웹 호출합니다.",
                    },
                    {
                      code: 2,
                      index: 2,
                      name: "정규화",
                      remark:
                        "SightCube 실시간 데이터 구조 정규화 작업을 합니다.",
                    },
                    {
                      code: 3,
                      index: 3,
                      name: "웹 서비스 호출",
                      remark: "고객사 서비스 웹 호출합니다.",
                    },
                  ].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                      <ListItem
                        onDoubleClick={() => handleIsPopupOpen(value.code)}
                        key={value}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#f1f1f1",
                          },
                        }}
                      >
                        <Paper
                          elevation={4}
                          sx={{
                            backgroundColor: "whitesmoke",
                            borderRadius: "5px",
                            height: "60px",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ListItemText
                              primary={`${value.index}`}
                              sx={{
                                width: "40px",
                                textAlign: "center",
                              }}
                            />
                            <ListItemIcon sx={{ justifyContent: "left" }}>
                              <SendIcon />
                            </ListItemIcon>
                            <ListItemText
                              id={labelId}
                              primary={`${value.name}`}
                              secondary={`${value.remark}`}
                            />
                          </Box>
                        </Paper>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <Modal open={isPopupOpen}>
        <ModalContent />
      </Modal>
    </BaseWireFrame>
  );
}
