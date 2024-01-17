import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  Typography,
  Link,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SignInContainer from "../../../components/layouts/signincontainer/SignInContainer";

function SignIn () {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <SignInContainer>
      <Grid container sx={{ height: "100%", display: "flex" }}>
        <Grid item md={6}></Grid>
        <Grid item md={6} sx={{ height: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: "5% 5% 5% 15%",
            }}
          >
            <div
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: "10px",
                padding: "20px",
                height: "400px",
                width: "400px",
              }}
            >
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Typography variant="h6" align="center" gutterBottom>
                  Smart FLOW
                </Typography>
                <Typography
                  align="center"
                  fontSize="13px"
                  gutterBottom
                  style={{ opacity: 0.5 }}
                >
                  Welcome to SK쉴더스
                </Typography>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 1 }}>
                <TextField
                  label="아이디"
                  variant="outlined"
                  required
                  style={{ borderRadius: 0 }}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 1 }}>
                <TextField
                  label="비밀번호"
                  id="password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControlLabel
                sx={{ mb: 2 }}
                control={<Checkbox defaultChecked />}
                label="로그인 상태 유지"
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => navigate("/myflow")}
                >
                  로그인
                </Button>
              </FormControl>
              <Typography align="center">
                <Link href="#" variant="body2">
                  아이디/비밀번호 찾기
                </Link>{" "}
                |{" "}
                <Link href="#" variant="body2">
                  SUMITS 회원 가입
                </Link>
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </SignInContainer>
  );
};

export default SignIn;
