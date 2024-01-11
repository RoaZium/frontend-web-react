import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Policy() {
  return (
    <Box
      alignItems="flex-start"
      display="flex"
      justifyContent="space-between"
      p={2}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        borderRadius={2}
        p={2}
        boxShadow="3"
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "column" }}
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold" textTransform="capitalize">
            정보 보안 정책
          </Typography>

          <Divider
            Color="skyblue"
            sx={{
              marginLeft: -2,
              marginRight: -2,
              marginTop: 1,
            }}
          />
        </Box>
        <Box mb={1} display="flex" flexDirection="row">
          <Grid container spacing={0} direction="flex">
            <Grid container xs={11.5} flexDirection="column">
              <TextField label="개인정보 보호"></TextField>
            </Grid>
            <Grid
              container
              xs={0.5}
              alignContent="center"
              justifyContent="right"
            >
              <Button variant="contained">등록</Button>
            </Grid>
          </Grid>
        </Box>
        <Box mb={1} display="flex" flexDirection="row">
          <Grid container spacing={0} direction="flex">
            <Grid container xs={11.5} flexDirection="column">
              <TextField label="회사 보안 정책"></TextField>
            </Grid>
            <Grid
              container
              xs={0.5}
              alignContent="center"
              justifyContent="right"
            >
              <Button variant="contained">등록</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
