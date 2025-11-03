import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Divider from "@mui/material/Divider";
import axios from "axios";
import React from "react";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import { SelectedVisitorInfoContext } from "../../App";
import { visitorColumns } from "../../assets/Columns/VisitorColumns";

const steps = ["예약 조회", "예약 확인"];

export default function ReservationSearch() {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState(5);
  const { selectedVisitorInfo, setSelectedVisitorInfo } = React.useContext(
    SelectedVisitorInfoContext
  );
  const [visitorList, setVisitorList] = React.useState([]);
  const [visitorName, setVisitorName] = React.useState();
  const [visitorTelephone, setVisitorTelephone] = React.useState();
  const [visitorCarNo, setVisitorCarNo] = React.useState();

  const SearchVisitor = () => {
    if (
      visitorName === null ||
      visitorName === undefined ||
      visitorName === ""
    ) {
      alert("성명을 입력해 주세요");
      return;
    }

    if (
      visitorTelephone === null ||
      visitorTelephone === undefined ||
      visitorTelephone === ""
    ) {
      alert("연락처를 입력해 주세요");
      return;
    }

    setVisitorList([]);
    GetVisitorInfo();
  };

  const data = {
    site_id: localStorage.getItem("SiteID"),
    visitor_name: `${visitorName}`,
    telephone: `${visitorTelephone}`,
    car_no: `${visitorCarNo}`,
  };

  const GetVisitorInfo = async () => {
    await axios
      .get("/visitor", {
        params: data,
      })
      .then((response) => {
        localStorage.setItem(
          "visitorID",
          response.data["visitors"][0].visitor_id
        );
        setVisitorList(response.data["visitors"]);
        console.log("Express2", response);
      });
  };

  return (
    <Box
      sx={{
        alignContent: "stretch",
        height: "760px",
        bgcolor: "transparent",
        display: "grid",
        gridAutoRows: "80px 115px auto",
        gridTemplateColumns: "1",
        gridTemplateRows: "3",
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
          activeStep={0}
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
        <Grid container spacing={3}>
          <Grid
            item
            container
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TextField
              label="성명"
              value={visitorName}
              onChange={(event) => setVisitorName(event.target.value)}
              variant="filled"
              sx={{
                marginRight: 2,
              }}
            />
            <TextField
              sx={{
                marginRight: 2,
              }}
              label="연락처"
              value={visitorTelephone}
              onChange={(event) => setVisitorTelephone(event.target.value)}
              variant="filled"
            />
            <TextField
              sx={{
                marginRight: 2,
              }}
              label="차량번호"
              value={visitorCarNo}
              onChange={(event) => setVisitorCarNo(event.target.value)}
              variant="filled"
            />
            <Button
              sx={{
                height: "30px",
                alignSelf: "center",
                justifyItems: "right",
                marginRight: 2,
              }}
              variant="contained"
              onClick={() => {
                SearchVisitor();
              }}
            >
              조회
            </Button>
            <Button
              sx={{
                height: "30px",
                alignSelf: "center",
                justifyItems: "right",
                marginRight: 2,
              }}
              variant="contained"
              onClick={() => {
                navigate("/");
              }}
            >
              홈
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          gridRow: "3",
          borderRadius: 3,
          display: "flex",
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Box
              alignItems="flex-start"
              display="flex"
              justifyContent="space-between"
            >
              <Box
                width="100%"
                display="flex"
                flexDirection="column"
                borderRadius={2}
                p={2}
                boxShadow="3"
                height="60vh"
              >
                <DataGrid
                  GridLinesVisibility="None"
                  rows={visitorList}
                  columns={visitorColumns}
                  pageSize={pageSize}
                  isCellEditable={(params) => 0}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  onRowDoubleClick={() => {
                    navigate("/ReservationConfirm");
                  }}
                  rowsPerPageOptions={[5, 10, 20]}
                  checkboxSelection={false}
                  getRowId={(row) => row.visitor_id}
                  onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedVisitorInfo = visitorList.filter((row) =>
                      selectedIDs.has(row.visitor_id)
                    );
                    setSelectedVisitorInfo(selectedVisitorInfo);
                  }}
                  sx={{
                    border: 0,
                    borderColor: "primary.light",
                    "& .MuiDataGrid-row:hover": {
                      color: "primary.main",
                    },
                    ".MuiDataGrid-cell:focus": {
                      outline: 0,
                    },
                    "&.MuiDataGrid-root": {
                      border: "none",
                    },
                  }}
                />
                <div></div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
