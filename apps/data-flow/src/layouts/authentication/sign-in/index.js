import "../../../styles/FlowLogin.css";
import { useNavigate } from "react-router-dom";
import { Content, LayoutBasic } from "../../LayoutBasic";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState } from "react";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function LoginImg() {
  return (
    <div className="LoginImg">
      <img src="https://scm-cdn.tworld.co.kr/img/ssp/contents/0003/14966/SK%EC%89%B4%EB%8D%94%EC%8A%A4-%EB%8C%80%ED%91%9C%EC%9D%B4%EB%AF%B8%EC%A7%80_MO_720x720.jpg"></img>
    </div>
  );
}

function LoginContent() {
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);

  function CheckLogin() {
    navigate("/FlowPage");
  }

  return (
    <Box
      className="LoginContent"
      sx={{ bgcolor: "background.default", color: "text.primary" }}
    >
      <div>
        <IconButton size="large">
          <SettingsIcon fontSize="inherit" />
        </IconButton>
        <Switch
          color="warning"
          className="SwitchColor"
          onClick={colorMode.toggleColorMode}
        />
      </div>
      <div classname="LoginSet">
        <img src="SKSieldus.png" />
        <br />
      </div>
      <div className="Login">
        <form style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h3">Sign Into Flow</Typography>
          <Typography variant="subtitle2">
            가입하러 가기 ⇒
            <Button color="warning" variant="text">
              Join
            </Button>
          </Typography>
          <br />
          <br />
          <TextField
            label="아이디"
            variant="outlined"
            color="warning"
            className="LoginWidth"
          />
          <FormControlLabel
            control={<Checkbox color="warning" />}
            label="아이디 저장하기"
            sx={{ fontWeight: "light", fontSize: "5px" }}
          />
          <TextField
            label="비밀번호"
            variant="outlined"
            color="warning"
            className="LoginWidth"
          />
          <br />
          <Button
            variant="contained"
            color="warning"
            onClick={CheckLogin}
            className="LoginWidth"
          >
            Login
          </Button>
          <Box>
            <Button sx={{ float: "right" }} color="warning" variant="text">
              비밀번호 찾기
            </Button>
            <Button sx={{ float: "right" }} color="warning" variant="text">
              아이디
            </Button>
          </Box>
        </form>
      </div>
    </Box>
  );
}

function FlowLogin() {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LayoutBasic>
          <Content>
            <LoginImg />
            <LoginContent />
          </Content>
        </LayoutBasic>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default FlowLogin;
