import React, { useEffect, useState } from "react";
import "@inovua/reactdatagrid-enterprise/index.css";
import { Button, Grid, Toolbar } from "@mui/material";
import BasicBreadcrumbs from "../../Basic/BreadScrum/index";
import { useLocation } from "react-router-dom";
import CreateSchedule from "../CreateSchedule";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useQueryComplicatedFetchHooks } from "../../../hooks/useQueryFetchHooks";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { usersActions } from "../../../store/userSlice";
import StarRateIcon from "@mui/icons-material/StarRate";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FlagIcon from "@mui/icons-material/Flag";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AxiosError } from "axios";

interface tourDataType {
  _id: string;
  name: string;
  duration: number;
  difficulty: string;
  ratingAverage: number;
  ratingQuantity: number;
  summary: string;
  startDates: string;
  location: string;
  isTourCompleted: boolean;
}

const ViewSchedule = () => {
  const location = useLocation();
  const [breadScrumTitle, setBreadScrumTitle] = useState<string>("");
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [tours, setTours] = useState<tourDataType[]>();
  const reduxToken: string = useAppSelector((state) => state.token);
  const reduxTheme: string = useAppSelector((state) => state.theme);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // React query responses
  const onSuccess = (data: any) => {
    setTours(data?.data?.tours);
    console.log("Sucess", data);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const {
    data: tourView,
    isFetching,
    isError,
    refetch: tourRefetch,
  } = useQueryComplicatedFetchHooks(
    onSuccess,
    onError,
    "https://hans-node-api.herokuapp.com/api/v1/tours/",
    300000,
    true,
    "TourView",
    5000,
    true,
    reduxToken
  );

  // Load pin when page is fistly rendered
  useEffect(() => {
    tourRefetch();
  }, []);

  // Getting bread scrum title whenever pathname is changed
  useEffect(() => {
    const makebreadScrumTitle = () => {
      let tempLocName = location.pathname.toString();
      tempLocName = tempLocName.charAt(1).toUpperCase() + tempLocName.slice(2);
      setBreadScrumTitle(tempLocName);
    };
    makebreadScrumTitle();
  }, [location.pathname]);

  // Dialog Handler
  const dialogCreateClickHandler = () => {
    setOpenCreateDialog(true);
  };

  const dialogCreateCloseHandler = (event?: any, reason?: string) => {
    if (reason && reason === "backdropClick") return;
    setOpenCreateDialog(false);
  };

  const deleteTourHandler = async (id: string) => {
    if (reduxToken) {
      try {
        const jwtConfig = {
          headers: {
            Authorization: "Bearer " + reduxToken,
          },
        };
        const res = await axios.delete(
          `https://hans-node-api.herokuapp.com/api/v1/tours/${id}`,
          jwtConfig
        );
        const tempTours = tours?.filter((item: any) => item._id !== id);
        setTours(tempTours);
        alert("Tour is successfully deleted.");
      } catch (err) {
        if (err instanceof AxiosError) {
          alert(err?.response?.data?.message);
        }
      }
    } else if (!reduxToken) {
      alert("You don't have valid token. Please log in again.");
      localStorage.clear();
      dispatch(usersActions.reset());
      navigate("/singIn");
    }
  };

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
          <Button
            variant="outlined"
            fullWidth={true}
            onClick={dialogCreateClickHandler}
            sx={{
              color: reduxTheme === "themeLight" ? "primary.main" : "white",
              border: reduxTheme === "themeLight" ? null : "1px solid white",
            }}
          >
            Create
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="outlined"
            fullWidth={true}
            onClick={() => tourRefetch()}
            sx={{
              color: reduxTheme === "themeLight" ? "primary.main" : "white",
              border: reduxTheme === "themeLight" ? null : "1px solid white",
            }}
          >
            Refresh
          </Button>
        </Grid>
      </Toolbar>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!tours
          ? null
          : tours?.map((t: tourDataType) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  sx={{ marginTop: "20px" }}
                  key={t?._id}
                >
                  <Card
                    sx={{
                      maxWidth: "120rem",
                      overflow: "hidden",
                      transition: "0.3s all",
                      border:
                        reduxTheme === "themeLight"
                          ? "1.5px solid #4263eb"
                          : "1px solid white",
                      boxShadow: " 0 10px 7px 2px rgba(124, 184, 229, 0.2);",
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "30px",
                          }}
                        >
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{
                              color: "white",
                              backgroundImage:
                                "linear-gradient(to right bottom, #0071a8, #4263eb )",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: "30px",
                            }}
                          >
                            {t?.name} -{" "}
                            {Array(t?.ratingAverage).fill(
                              <StarRateIcon
                                sx={{
                                  color: "white",
                                }}
                              />
                            )}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gridGap: " 10px",
                            justifyItems: "center",
                            alignItems: "center",
                            marginBottom: "30px",
                          }}
                        >
                          <Typography
                            sx={{
                              mb: 1.5,
                              display: "flex",
                              justifyContent: "center",
                              justifyItems: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                            color="text.secondary"
                          >
                            <FlagIcon sx={{ color: "#4263eb" }} />
                            {t?.difficulty?.toUpperCase()}
                          </Typography>
                          <Typography
                            sx={{
                              mb: 1.5,
                              display: "flex",
                              justifyContent: "center",
                              justifyItems: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                            color="text.secondary"
                          >
                            <LocationOnIcon sx={{ color: "#4263eb" }} />
                            {t?.location?.toUpperCase()}
                          </Typography>
                          <Typography
                            sx={{
                              mb: 1.5,
                              display: "flex",
                              justifyContent: "center",
                              justifyItems: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                            color="text.secondary"
                          >
                            <DateRangeIcon sx={{ color: "#4263eb" }} />

                            {moment(t?.startDates).format("YYYY-MM-DD")}
                          </Typography>
                          <Typography
                            sx={{
                              mb: 1.5,
                              display: "flex",
                              justifyContent: "center",
                              justifyItems: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                            color="text.secondary"
                          >
                            <CheckIcon sx={{ color: "#4263eb" }} />
                            {t?.isTourCompleted
                              ? "Completed".toUpperCase()
                              : "Not Yet".toUpperCase()}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            padding: "10px",
                            marginBottom: "10px",
                            border: "2px solid #0071a8",
                            borderRadius: "8px",
                          }}
                        >
                          {t?.summary}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#4263eb",
                          float: "right",
                        }}
                        onClick={() => {
                          navigate("/mappin");
                        }}
                      >
                        See More details
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#4263eb",
                          float: "right",
                        }}
                        onClick={() => deleteTourHandler(t?._id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
      <CreateSchedule
        open={openCreateDialog}
        close={dialogCreateCloseHandler}
      />
    </Grid>
  );
};

export default ViewSchedule;
