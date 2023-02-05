import { Button, Divider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function PasswordChange() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
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
            비밀번호 변경
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
        <Box mb={1} display="flex" flexDirection="column">
          <TextField label="현재 비밀번호"></TextField>
        </Box>
        <Box mb={1} display="flex" flexDirection="column">
          <TextField label="비밀번호 변경"></TextField>
        </Box>
        <Box mb={1} display="flex" flexDirection="column">
          <TextField label="비밀번호 확인"></TextField>
        </Box>
        <Box mb={1} display="flex" flexDirection="row-reverse">
          <Button variant="contained">변경</Button>
        </Box>
      </Box>
    </Box>
  );
}
