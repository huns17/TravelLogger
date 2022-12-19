/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { usersActions } from "../../store/userSlice";
import Countdown, { CountdownRenderProps } from "react-countdown";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import img1 from "../../assets/images/kor1.png";
import img2 from "../../assets/images/kor2.png";
import img3 from "../../assets/images/kor3.png";
import img4 from "../../assets/images/kor4.png";
import img5 from "../../assets/images/kor5.png";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "react-alice-carousel/lib/alice-carousel.css";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reduxTheme: string = useAppSelector((state) => state.theme);
  const items = [
    <div
      className="container"
      data-value="1"
      style={{ width: "100%", height: "240px", borderRadius: "8px" }}
    >
      <Box
        component="img"
        src={img1}
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>,
    <div
      className="container"
      data-value="2"
      style={{ width: "100%", height: "240px", borderRadius: "8px" }}
    >
      <Box
        component="img"
        src={img2}
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>,
    <div
      className="container"
      data-value="3"
      style={{ width: "100%", height: "240px", borderRadius: "8px" }}
    >
      <Box
        component="img"
        src={img3}
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>,
    <div
      className="container"
      data-value="4"
      style={{ width: "100%", height: "240px", borderRadius: "8px" }}
    >
      <Box
        component="img"
        src={img4}
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>,
    <div
      className="container"
      data-value="5"
      style={{ width: "100%", height: "240px", borderRadius: "8px" }}
    >
      <Box
        component="img"
        src={img5}
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>,
  ];

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Box maxWidth={1200} mt={4.5}>
        <Grid
          container
          spacing={8}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Paper
              elevation={7}
              sx={{
                height: "240px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                maxWidth: "350px",
                alignContent: "center",
                border:
                  reduxTheme === "themeLight"
                    ? "1.5px solid #4263eb"
                    : "1.5px solid white",
              }}
              onClick={() => {
                navigate("/home");
                dispatch(usersActions.updateDashboardIndex(0));
                localStorage.setItem("index", "0");
              }}
            >
              <FlightTakeoffIcon
                fontSize="large"
                sx={{
                  color: reduxTheme === "themeLight" ? "primary.main" : "white",
                }}
              />
              {/* year, month, day, hours, minutes, seconds, milliseconds */}

              <Countdown
                date={new Date(2022, 11, 22, 11, 59)}
                intervalDelay={0}
                precision={3}
                zeroPadTime={2}
                renderer={(props: CountdownRenderProps) => (
                  <Typography
                    variant="subtitle2"
                    color="#4263eb"
                    align="center"
                  >{`${props.days} Days, ${props.hours} hours ${props.minutes}, minutes ${props.seconds}, seconds `}</Typography>
                )}
                onComplete={() => {
                  alert("Congrat Time to go to Korea..!!🇰🇷");
                }}
              ></Countdown>
              <Typography color="red">To Korea</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Paper
              elevation={7}
              sx={{
                height: "240px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                maxWidth: "350px",
                border:
                  reduxTheme === "themeLight"
                    ? "1.5px solid #4263eb"
                    : "1.5px solid white",
                alignContent: "center",
              }}
              onClick={() => {
                navigate("/mappin");
                dispatch(usersActions.updateDashboardIndex(1));
                localStorage.setItem("index", "1");
              }}
            >
              <PublicIcon
                fontSize="large"
                sx={{
                  color: reduxTheme === "themeLight" ? "primary.main" : "white",
                }}
              />
              <Typography>Map Pin</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Paper
              elevation={7}
              sx={{
                height: "240px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                maxWidth: "350px",
                border:
                  reduxTheme === "themeLight"
                    ? "1.5px solid #4263eb"
                    : "1.5px solid white",
                alignContent: "center",
              }}
              onClick={() => {
                navigate("/schedule");
                dispatch(usersActions.updateDashboardIndex(2));
                localStorage.setItem("index", "2");
              }}
            >
              <CalendarMonthIcon
                fontSize="large"
                sx={{
                  color: reduxTheme === "themeLight" ? "primary.main" : "white",
                }}
              />
              <Typography>Schedule</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Paper
              elevation={7}
              sx={{
                height: "240px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                maxWidth: "350px",
                alignContent: "center",
              }}
            >
              <AliceCarousel
                autoPlay
                autoPlayStrategy="none"
                autoPlayInterval={1000}
                animationDuration={1000}
                animationType="fadeout"
                infinite
                touchTracking={true}
                disableDotsControls
                disableButtonsControls
                items={items}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
