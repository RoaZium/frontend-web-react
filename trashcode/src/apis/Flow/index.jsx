import { FlowData } from "../../assets/json/flowData";
import axios from "axios";

var flowConfig = {
  method: "post",
  url: "http://10.250.250.192:50020/rest/v2/",
  headers: {
    "Content-Type": "application/json",
  },
  data: FlowData,
};

// POST: Flow 생성
export const PostFlow = async (props) => {
  console.log("API 테스트");
  await axios(flowConfig)
    .then((response) => {
      if (response.data.code === -1) {
        alert("Flow 저장 실패.");
      } else {
        alert("Flow 저장 성공.");
      }

      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
