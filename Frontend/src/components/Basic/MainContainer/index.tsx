import "./maincontainer.css";
import { Grid, Paper } from "@mui/material";

import { useAppSelector } from "../../../store/hooks";

const MainContainer = (props: any) => {
  const reduxTheme: string = useAppSelector((state) => state.theme);

  return (
    <div className="mainContainer">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <Paper
            elevation={8}
            sx={{
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              padding: "15px",
              boxSizing: "border-box",
            }}
          >
            <Grid item xs={12} sm={12} sx={{ padding: "10px" }}>
              {props.children}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainContainer;
