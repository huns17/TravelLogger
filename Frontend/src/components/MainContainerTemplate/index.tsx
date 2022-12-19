import React, { useEffect, useState } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import "@inovua/reactdatagrid-enterprise/index.css";
import { Button, Grid, Toolbar } from "@mui/material";
import BasicBreadcrumbs from "../Basic/BreadScrum";
import { useLocation } from "react-router-dom";

const columns = [
  { name: "name", header: "Name", minWidth: 50, defaultFlex: 2 },
  { name: "age", header: "Age", maxWidth: 1000, defaultFlex: 1 },
];

const gridStyle = { minHeight: 550 };

const dataSource = [
  { id: 1, name: "John McQueen", age: 35 },
  { id: 2, name: "Mary Stones", age: 25 },
  { id: 3, name: "Robert Fil", age: 27 },
  { id: 4, name: "Roger Robson", age: 81 },
  { id: 5, name: "Billary Konwik", age: 18 },
  { id: 6, name: "Bob Martin", age: 18 },
  { id: 7, name: "Matthew Richardson", age: 54 },
  { id: 8, name: "Ritchie Peterson", age: 54 },
  { id: 9, name: "Bryan Martin", age: 40 },
  { id: 10, name: "Mark Martin", age: 44 },
  { id: 11, name: "Michelle Sebastian", age: 24 },
  { id: 12, name: "Michelle Sullivan", age: 61 },
  { id: 13, name: "Jordan Bike", age: 16 },
  { id: 14, name: "Nelson Ford", age: 34 },
  { id: 15, name: "Tim Cheap", age: 3 },
  { id: 16, name: "Robert Carlson", age: 31 },
  { id: 17, name: "Johny Perterson", age: 40 },
];
const MainContainerTemplate = () => {
  const location = useLocation();
  const [breadScrumTitle, setBreadScrumTitle] = useState<string>("");

  // Getting bread scrum title whenever pathname is changed
  useEffect(() => {
    const makebreadScrumTitle = () => {
      let tempLocName = location.pathname.toString();
      tempLocName = tempLocName.charAt(1).toUpperCase() + tempLocName.slice(2);
      setBreadScrumTitle(tempLocName);
    };
    makebreadScrumTitle();
  }, [location.pathname]);

  return (
    <Grid item xs={12} sm={12}>
      <Toolbar
        sx={{
          borderRadius: "8px",
          border: "1px solid",
          borderColor: "primary.main",
          gap: "10px",
          padding: "15px",
        }}
      >
        <Grid item xs={12} sm={6}>
          <BasicBreadcrumbs breadScrumTile={breadScrumTitle} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="outlined" fullWidth={true}>
            Create
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="outlined" fullWidth={true}>
            Load
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="outlined" fullWidth={true}>
            Clear
          </Button>
        </Grid>
      </Toolbar>
      <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
        <ReactDataGrid
          idProperty="id"
          columns={columns}
          dataSource={dataSource}
          style={gridStyle}
        />
      </Grid>
    </Grid>
  );
};

export default MainContainerTemplate;
