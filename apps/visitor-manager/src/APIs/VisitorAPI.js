import axios from "axios";

export const GetVisitor = async () => {
  await axios
    .get(
      "/visitor?visitor_id=VT7148&site_id=01f0ea04-6040-47d8-a756-f1b08d855096",
      { headers: { login_token: "319A1998-3BE8-47DD-A118-E2B387817FA2" } }
    )
    .then(function (response) {
      if (response.data[0] != null) {
        console.log("hhh");
        return response.data["visitors"][0];
      } else {
        caches.log("ttt");
        return null;
      }
    });
};
