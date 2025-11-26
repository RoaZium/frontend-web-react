import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { methodList, callList } from "./List.tsx";
import { TextFieldProps } from "./Props.tsx";
import { useState } from "react";

//기본
export function Contents1() {
  return (
    <div>
      <TextField
        {...TextFieldProps}
        label="URL"
        bgcolor="#FFEFD5"
        placeholder="URL을 입력하세요."
      />
      <TextField
        {...TextFieldProps}
        select
        label="Method"
        defaultValue="PUT"
        bgcolor="#FFEFD5"
      >
        {methodList.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        {...TextFieldProps}
        label="허용"
        defaultValue="application/xml"
      />
      <TextField
        {...TextFieldProps}
        label="콘텐츠 형식"
        defaultValue="application/xml"
      />
      <TextField
        {...TextFieldProps}
        multiline
        rows={4}
        label="사용자 지정 헤더"
      />
      <TextField {...TextFieldProps} multiline rows={4} label="요청 본문" />
      <TextField {...TextFieldProps} select label="Method" defaultValue="1">
        {callList.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

//고급
export function Contents2() {
  const [state, setState] = useState({
    redirection: true,
    cookie: false,
    error: false,
    incode: true,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormControl color="warning" sx={{ m: 2 }}>
      <FormLabel>On/Off</FormLabel>
      <FormControlLabel
        label="리디렉션 팔로우"
        control={
          <Switch
            checked={state.redirection}
            onChange={handleChange}
            name="redirection"
            color="warning"
          />
        }
      />
      <FormControlLabel
        label="쿠키 지우기"
        control={
          <Switch
            checked={state.cookie}
            onChange={handleChange}
            name="cookie"
            color="warning"
          />
        }
      />
      <FormControlLabel
        label="오류 상태 시 실패"
        control={
          <Switch
            checked={state.error}
            onChange={handleChange}
            name="error"
            color="warning"
          />
        }
      />
      <FormControlLabel
        label="오류 본문 인코드"
        control={
          <Switch
            checked={state.incode}
            onChange={handleChange}
            name="incode"
            color="warning"
          />
        }
      />
    </FormControl>
  );
}
