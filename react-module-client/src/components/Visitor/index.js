import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { SelectedVisitorInfoContext } from "../../App";
import axios from "axios";

const columns = [
  {
    visitor_id: "VisitorID",
    headerName: "ID",
    flex: 0.01,
    editable: false,
    align: "center",
    headerAlign: "center",
    hide: true,
  },
  {
    field: "visitor_name",
    headerName: "이름",
    editable: false,
    align: "center",
    flex: 0.7,
    headerAlign: "center",
  },
  {
    field: "comapny_name",
    headerName: "회사명",
    editable: false,
    align: "center",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "telephone",
    headerName: "연락처",
    editable: false,
    align: "center",
    flex: 1.5,
    headerAlign: "center",
  },
  {
    field: "car_no",
    headerName: "차량번호",
    editable: false,
    align: "center",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "이메일",
    editable: false,
    align: "center",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "purpose",
    headerName: "방문 목적",
    editable: false,
    align: "center",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "visit_from",
    headerName: "방문 시작일",
    editable: false,
    align: "center",
    flex: 2,
    headerAlign: "center",
    type: "date",
  },
  {
    field: "visit_to",
    headerName: "방문 종료일",
    editable: false,
    align: "center",
    flex: 2,
    headerAlign: "center",
    type: "date",
  },
  {
    field: "1",
    headerName: "피방문자 성명",
    editable: false,
    align: "center",
    flex: 0.8,
    headerAlign: "center",
  },
  {
    field: "2",
    headerName: "피방문자 부서",
    editable: false,
    align: "center",
    flex: 0.8,
    headerAlign: "center",
  },
  {
    field: "3",
    headerName: "피방문자 연락처",
    editable: false,
    align: "center",
    flex: 0.8,
    headerAlign: "center",
  },
  {
    field: "agree_privacy",
    headerName: "개인정보동의",
    editable: false,
    align: "center",
    flex: 0.8,
    headerAlign: "center",
  },
];

export default function Visitor() {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState(5);
  const { selectedVisitorInfo, setSelectedVisitorInfo } = React.useContext(
    SelectedVisitorInfoContext
  );
  const [visitorList, setVisitorList] = React.useState([]);
  const [visitorName, setVisitorName] = React.useState("");
  const [visitorTelephone, setVisitorTelephone] = React.useState("");
  const [visitorCarNo, setVisitorCarNo] = React.useState("");

  useEffect(() => {
    GETVisitorInfo();
  }, []);

  var config = {
    method: "get",
    url: "/visitor?site_id=00000000-0000-0000-0000-000000000000",
    headers: {},
  };

  const GETVisitorInfo = async () => {
    await axios(config)
      .then(function (response) {
        setVisitorList(response.data["visitors"]);
        console.log("1", JSON.stringify(response.data));
        console.log("1", visitorList);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const RowDoubleClick = () => {
    navigate("/VisitorDetailManagement");
  };

  return (
    <Box alignItems="flex-start" display="flex" justifyContent="space-between">
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        borderRadius={2}
        p={2}
        boxShadow="3"
        height="60vh"
      >
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" sx={{ marginRight: 2 }}>
            조회
          </Button>
        </Box>
        <DataGrid
          GridLinesVisibility="None"
          rows={visitorList}
          columns={columns}
          pageSize={pageSize}
          isCellEditable={(params) => 0}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onRowDoubleClick={RowDoubleClick}
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
  );
}
