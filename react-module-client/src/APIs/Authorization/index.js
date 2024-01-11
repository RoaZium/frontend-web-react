var axios = require("axios");

var authorizationData = {
  visitor_id: localStorage.getItem("visitorID"),
  authorities: [
    {
      authoritygroup_id: null,
    },
  ],
};

var putConfig = {
  method: "put",
  url: "/visitorauthoritygroup",
  headers: {
    login_token: localStorage.getItem("Token"),
    "Content-Type": "application/json",
  },
  data: authorizationData,
};

var deleteConfig = {
  method: "delete",
  url: "/visitorauthoritygroup",
  headers: {
    login_token: localStorage.getItem("Token"),
    "Content-Type": "application/json",
  },
  data: authorizationData,
};

// PUT: 출입그룹권한
export const PutAuthorization = async (props) => {
  authorizationData.authorities[0].authoritygroup_id = props;
  authorizationData.visitor_id = localStorage.getItem("visitorID");

  console.log("Token", putConfig.headers.login_token);

  await axios(putConfig)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

// DELETE: 출입그룹권한
export const DeleteAuthorization = async (props) => {
  authorizationData.authorities[0].authoritygroup_id = props;
  authorizationData.visitor_id = localStorage.getItem("visitorID");

  await axios(deleteConfig)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
