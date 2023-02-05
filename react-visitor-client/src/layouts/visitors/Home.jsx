import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const buttonStyle = {
  minWidth: "350px",
  minHeight: "400px",
  borderRadius: 10,
  boxShadow: 13,
  fontSize: 30,
  textAlign: "top",
};

export default function Home() {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        height: "80vh",
        bgcolor: "transparent",
        borderRadius: 3,
      }}
    >
      <Grid container>
        <Grid
          bgcolor="transparent"
          item
          xs={5.5}
          container
          justifyContent="right"
        >
          <Link to="/AgreePrivacy" style={{ textDecoration: "none" }}>
            <Button sx={buttonStyle} variant="contained">
              방문자 예약 신청
              <AssignmentIndIcon
                sx={{
                  height: "100px",
                  width: "100px",
                  position: "absolute",
                  top: "40px",
                  color: "white",
                }}
              />
            </Button>
          </Link>
        </Grid>
        <Grid xs={1} visibility="hidden"></Grid>
        <Grid
          item
          bgcolor="transparent"
          xs={5.5}
          container
          justifyContent="left"
        >
          <Link to="/ReservationSearch" style={{ textDecoration: "none" }}>
            <Button sx={buttonStyle} variant="contained">
              방문자 예약 조회
              <AssignmentIndIcon
                sx={{
                  height: "100px",
                  width: "100px",
                  position: "absolute",
                  top: "40px",
                  color: "white",
                }}
              />
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
