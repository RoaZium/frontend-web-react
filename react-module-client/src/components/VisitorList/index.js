import React, { useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

import { SelectedVisitorInfoContext } from "../../App";
import { visitorColumns } from "../../assets/Columns/VisitorColumns";

export default function VisitorList() {
  const navigate = useNavigate();
  const { selectedVisitorInfo, setSelectedVisitorInfo } = React.useContext(
    SelectedVisitorInfoContext
  );

  const [pageSize, setPageSize] = React.useState(10);
  const [visitorList, setVisitorList] = React.useState([]);

  useEffect(() => {
    console.log("useEffect");
    GetVisitorAdmin();
  }, []);

  var config = {
    method: "get",
    url: `/visitoradmin?site_id=${localStorage.getItem("SiteID")}`,
    headers: {
      login_token: localStorage.getItem("Token"),
    },
  };

  const GetVisitorAdmin = async () => {
    await axios(config)
      .then(function (response) {
        setVisitorList(response.data["visitors"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  var DeleteConfig = {
    method: "delete",
    url: `/visitor?visitor_id=`,
    headers: {
      login_token: localStorage.getItem("Token"),
    },
  };

  const DeleteSelectedVisitor = async () => {
    DeleteConfig.url = `/visitor?visitor_id=${selectedVisitorInfo[0].visitor_id}`;
    await axios(DeleteConfig)
      .then(function (response) {
        alert("삭제되었습니다.");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleRemoveItem = (e) => {
    var result = visitorList.filter(
      (item) => item.visitor_id !== selectedVisitorInfo[0].visitor_id
    );

    setVisitorList([...result]);
    console.log(result);
  };

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
        height="70vh"
      >
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{ marginRight: 2 }}
            onClick={GetVisitorAdmin}
          >
            조회
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              DeleteSelectedVisitor();
            }}
          >
            삭제
          </Button>
        </Box>
        <DataGrid
          GridLinesVisibility="None"
          rows={visitorList}
          columns={visitorColumns}
          pageSize={pageSize}
          isCellEditable={(params) => 0}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onRowDoubleClick={() => {
            navigate("/VisitorDetailManagement");
          }}
          rowsPerPageOptions={[10, 20, 40]}
          checkboxSelection={false}
          getRowId={(row) => row.visitor_id}
          onSelectionModelChange={(ids, newValue, reason) => {
            const selectedIDs = new Set(ids);

            const selectedVisitorInfo = visitorList.filter((row) =>
              selectedIDs.has(row.visitor_id)
            );

            localStorage.setItem(
              "visitorID",
              selectedVisitorInfo[0].visitor_id
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
