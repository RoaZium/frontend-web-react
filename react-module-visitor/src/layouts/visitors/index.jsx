import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Route, Routes, useNavigate } from "react-router-dom";
import VisitorApplication from "./VisitorApplication";
import ReservationConfirm from "./ReservationConfirm";
import { Button, Container } from "@mui/material";
import CI from "../../assets/images/CI.png";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../assets/theme";
import Login from "../admins/Login";
import VisitorManagement from "../admins/VisitorManagement";
import VisitorDetailManagement from "../admins/VisitorDetailManagement";
import AdminManagement from "../admins/AdminManagement";
import AgreePrivacy from "./AgreePrivacy";
import Home from "./Home";
import ReservationSearch from "./ReservationSearch";
import Reservation from "./Reservation";

export default function Main() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Box sx={{ bgcolor: "transparent", height: "100px" }}>
          <Grid
            container
            display="flex"
            sx={{
              direction: "row",
            }}
          >
            <Grid item xs={1}>
              <Box
                component="img"
                src={CI}
                sx={{
                  bgcolor: "transparent",
                  height: 40,
                  marginLeft: 3,
                  my: 3,
                }}
              />
            </Grid>
            <Grid item xs={10.4}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  bgcolor: "transparent",
                  alignSelf: "center",
                  my: 3,
                }}
              >
                방문 예약 시스템
              </Typography>
            </Grid>
            <Grid item xs={0.6} display="flex">
              <Button
                sx={{ alignSelf: "center", justifyItems: "right" }}
                variant="contained"
                onClick={() => {
                  navigate("/login");
                }}
              >
                관리자
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Container maxWidth="">
          <Box sx={{ bgcolor: "transparent" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/AgreePrivacy" element={<AgreePrivacy />} />
              <Route
                path="/VisitorApplication"
                element={<VisitorApplication />}
              />
              <Route
                path="/ReservationConfirm"
                element={<ReservationConfirm />}
              />
              <Route path="/Login" element={<Login />} />
              <Route
                path="/VisitorManagement"
                element={<VisitorManagement />}
              />
              <Route
                path="/VisitorDetailManagement"
                element={<VisitorDetailManagement />}
              />
              <Route path="/AdminManagement" element={<AdminManagement />} />
              <Route
                path="/ReservationSearch"
                element={<ReservationSearch />}
              />
            </Routes>
          </Box>
        </Container>
        <Box sx={{ bgcolor: "transparent", height: "auto" }} />
      </React.Fragment>
    </ThemeProvider>
  );
}
