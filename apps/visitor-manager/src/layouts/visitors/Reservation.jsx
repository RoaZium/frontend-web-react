import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Divider from "@mui/material/Divider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

const steps = ["개인정보 및 보안정책 동의", "방문신청 정보 입력", "예약 확인"];

export default function Reservation() {
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState({});

  useEffect(() => {
    if (
      localStorage.getItem("visitorID") === undefined ||
      localStorage.getItem("visitorID") === null
    ) {
      navigate("/");
    }

    setVisitors({});
    GetVisitor();
  }, []);

  var config = {
    method: "get",
    url: `/visitor?site_id=${localStorage.getItem(
      "SiteID"
    )}&visitor_id=${localStorage.getItem("visitorID")}`,
    headers: {},
  };

  const GetVisitor = async () =>
    await axios(config)
      .then(function (response) {
        setVisitors(response.data["visitors"][0]);
      })
      .catch(function (error) {
        console.log(error);
      });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          alignContent: "stretch",
          height: "760px",
          bgcolor: "transparent",
          display: "grid",
          gridAutoRows: "80px auto auto 70px",
          gridTemplateColumns: "1",
          gridTemplateRows: "4",
          gap: 1,
        }}
      >
        <Box
          sx={{
            gridRow: "1",
            borderRadius: 3,
            boxShadow: 3,
            p: 2,
          }}
        >
          <Stepper
            sx={{
              bgcolor: "transparent",
            }}
            activeStep={2}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box
          sx={{
            gridRow: "2",
            borderRadius: 3,
            boxShadow: 3,
            p: 2,
            display: "grid",
            gridAutoRows: "30px 5px auto",
            gridTemplateRows: "3",
          }}
        >
          <Typography
            bgcolor="transparent"
            fontWeight="bold"
            fontSize={20}
            sx={{
              gridRow: "1",
            }}
          >
            방문자 정보
          </Typography>
          <Divider
            sx={{
              gridRow: "2",
              marginBottom: 2,
              marginLeft: -2,
              marginRight: -2,
            }}
          />
          <Grid
            container
            spacing={3}
            sx={{
              gridRow: "3",
              display: "flex",
            }}
          >
            <Grid
              item
              container
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                label="성명"
                value={visitors.visitor_name}
                variant="filled"
                InputLabelProps={{ shrink: true }}
                sx={{
                  marginBottom: 2,
                }}
              />
              <TextField
                sx={{
                  marginBottom: 2,
                }}
                label="회사명"
                value={visitors.comapny_name}
                variant="filled"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                sx={{
                  marginBottom: 2,
                }}
                label="이메일"
                value={visitors.email}
                variant="filled"
                InputLabelProps={{ shrink: true }}
              />
              <DateTimePicker
                label="방문 시작일"
                value={visitors.visit_from}
                inputFormat="yyyy-MM-dd HH:mm"
                renderInput={(params) => (
                  <TextField {...params} sx={{ marginBottom: 2 }} />
                )}
              />
            </Grid>
            <Grid
              item
              container
              xs={6}
              sx={{
                flexDirection: "column",
              }}
            >
              <TextField
                sx={{
                  marginBottom: 2,
                }}
                label="연락처"
                value={visitors.telephone}
                variant="filled"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                sx={{
                  marginBottom: 2,
                }}
                label="방문목적"
                value={visitors.purpose}
                variant="filled"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                sx={{
                  marginBottom: 2,
                }}
                label="차량번호"
                value={visitors.car_no}
                variant="filled"
                InputLabelProps={{ shrink: true }}
              />
              <DateTimePicker
                label="방문 종료일"
                defaultValue={"Some Value"}
                value={visitors.visit_to}
                inputFormat="yyyy-MM-dd HH:mm"
                renderInput={(params) => (
                  <TextField {...params} sx={{ marginBottom: 2 }} />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            gridRow: "3",
            borderRadius: 3,
            boxShadow: 3,
            p: 2,
            display: "grid",
            gridAutoRows: "30px 5px auto",
            gridTemplateRows: "3",
          }}
        >
          <Typography
            bgcolor="transparent"
            fontWeight="bold"
            fontSize={20}
            sx={{
              gridRow: "1",
            }}
          >
            피방문자 정보
          </Typography>
          <Divider
            sx={{
              gridRow: "2",
              marginBottom: 2,
              marginLeft: -2,
              marginRight: -2,
            }}
          />
          <Grid
            container
            spacing={3}
            sx={{
              gridRow: "3",
              display: "flex",
            }}
          >
            <Grid
              item
              container
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                sx={{
                  marginBottom: 2,
                }}
                label="피방문자 성명"
                value={localStorage.getItem("ManagerID")}
                variant="filled"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                sx={{
                  marginBottom: 2,
                }}
                label="피방문자 부서"
                value={visitors.manager_dept_name}
                variant="filled"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid
              item
              container
              xs={6}
              sx={{
                flexDirection: "column",
              }}
            >
              <TextField
                sx={{
                  marginBottom: 2,
                }}
                label="피방문자 연락처"
                value={visitors.manager_name}
                variant="filled"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            gridRow: "4",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Grid item sm={6}>
            <Box p={2} textAlign="center">
              <Link to="/ReservationSearch" style={{ textDecoration: "none" }}>
                <Button variant="contained" fullWidth>
                  이전 페이지
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box p={2} textAlign="center">
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" fullWidth>
                  홈으로
                </Button>
              </Link>
            </Box>
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
