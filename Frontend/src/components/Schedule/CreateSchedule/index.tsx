/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-useless-escape */
/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
/* eslint-disable yoda */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField, Box, Typography, FormGroup } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useQueryMutationInvalidateHooksPost } from "../../../hooks/useQueryMutationInvalidateHooks";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { usersActions } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface registerPropsType {
  open: boolean;
  close: () => void;
}

interface tourDataType {
  duration: number;
  ratingAverage: number;
  summary: string;
  startDates: string;
  location: string;
  name: string;
}

// eslint-disable-next-line arrow-body-style
const CreateSchedule = ({ open, close }: registerPropsType) => {
  const [tourObject, setTourObject] = useState<tourDataType>({
    name: "",
    duration: 0,
    ratingAverage: 0,
    summary: "",
    startDates: "",
    location: "",
  });
  const [difficulty, setDifficulty] = useState<string>("");
  const [isTourCompleted, setIsTourCompleted] = useState<string>("");
  const reduxToken: string = useAppSelector((state) => state.token);
  const { mutate, isError, error } = useQueryMutationInvalidateHooksPost(
    "https://hans-node-api.herokuapp.com/api/v1/tours/",
    "TourView",
    reduxToken
  );
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  // Handler function
  const tourObjectChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTourObject((prev: tourDataType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const difficultyChangeHandler = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as string);
  };

  const tourCompletedChangeHandler = (event: SelectChangeEvent) => {
    setIsTourCompleted(event.target.value);
  };

  //  Button Functions
  const handleClose = () => {
    //  Resetting the values
    setTourObject({
      name: "",
      duration: 0,
      ratingAverage: 0,
      summary: "",
      startDates: "",
      location: "",
    });
    setDifficulty("");
    setIsTourCompleted("");
    close();
  };

  //  Button functions
  const submitHandler = async (event: any) => {
    event.preventDefault();
    if (reduxToken) {
      if (
        tourObject.name &&
        tourObject.duration &&
        tourObject.location &&
        tourObject.ratingAverage &&
        tourObject.summary &&
        difficulty &&
        isTourCompleted
      ) {
        //  fetching data
        const requestBody = {
          ...tourObject,
          difficulty,
          isTourCompleted: isTourCompleted === "True",
        };
        mutate(requestBody);
        handleClose();
      } else if (
        !tourObject.name ||
        !tourObject.duration ||
        !tourObject.location ||
        !tourObject.ratingAverage ||
        !tourObject.summary ||
        !difficulty ||
        !isTourCompleted
      ) {
        alert("Please enter all required fields to create tour.");
      }
    } else if (!reduxToken) {
      alert("You don't have valid token. Please log in again.");
      localStorage.clear();
      dispatch(usersActions.reset());
      navigate("/singIn");
    }
  };

  // Error handling for react query.
  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data?.message);
      }
    }
  }, [isError, error]);

  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        maxWidth="sm"
        fullWidth={true}
        PaperProps={{
          style: {
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "#4263eb",
            clipPath: "polygon(0 0, 100% 0%, 100% 83%, 0% 98%)",
            color: "white",
          }}
        >
          Create Tours
        </DialogTitle>
        <DialogContent>
          <DialogContentText align="left">
            Please enter required fields to create the tours.
          </DialogContentText>
          <Box sx={{ padding: "20px" }}>
            <FormGroup onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      sx={{
                        color: "red",
                        fieldset: { borderColor: "slateblue" },
                      }}
                      margin="dense"
                      id="value-input"
                      type="date"
                      fullWidth={true}
                      onChange={tourObjectChangeHandler}
                      label="Start Date"
                      focused
                      name="startDates"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      sx={{
                        color: "red",
                        fieldset: { borderColor: "slateblue" },
                      }}
                      margin="dense"
                      id="value-input"
                      type="string"
                      fullWidth={true}
                      onChange={tourObjectChangeHandler}
                      label="Name"
                      name="name"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <TextField
                      sx={{
                        color: "red",
                        fieldset: { borderColor: "slateblue" },
                      }}
                      margin="dense"
                      id="value-input"
                      type="string"
                      fullWidth={true}
                      onChange={tourObjectChangeHandler}
                      label="Location"
                      name="location"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <TextField
                      sx={{
                        color: "red",
                        fieldset: { borderColor: "slateblue" },
                      }}
                      margin="dense"
                      id="value-input"
                      type="number"
                      fullWidth={true}
                      onChange={tourObjectChangeHandler}
                      label="Duration"
                      name="duration"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <TextField
                      sx={{
                        color: "red",
                        fieldset: { borderColor: "slateblue" },
                      }}
                      margin="dense"
                      id="value-input"
                      InputProps={{ inputProps: { min: 1, max: 5 } }}
                      type="number"
                      fullWidth={true}
                      onChange={tourObjectChangeHandler}
                      label="Rating"
                      name="ratingAverage"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      sx={{
                        color: "red",
                        fieldset: { borderColor: "slateblue" },
                      }}
                      margin="dense"
                      id="value-input"
                      type="string"
                      fullWidth={true}
                      onChange={tourObjectChangeHandler}
                      label="Tour Summary"
                      name="summary"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="Difficulty-select-label">
                      Difficulty
                    </InputLabel>
                    <Select
                      labelId="Difficulty-select-label"
                      id="Difficulty-select"
                      key={difficulty}
                      label="Difficulty"
                      defaultValue={difficulty}
                      onChange={difficultyChangeHandler}
                      sx={{ fieldset: { borderColor: "primary.main" } }}
                    >
                      <MenuItem value={"easy"}>Easy</MenuItem>
                      <MenuItem value={"medium"}>Medium</MenuItem>
                      <MenuItem value={"difficulty"}>Difficulty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="TourStatus-select-label">
                      Tour Status
                    </InputLabel>
                    <Select
                      labelId="TourStatus-select-label"
                      id="TourStatus-select"
                      label="Tour Status"
                      defaultValue=""
                      onChange={tourCompletedChangeHandler}
                      sx={{ fieldset: { borderColor: "primary.main" } }}
                    >
                      <MenuItem value={"True"}>True</MenuItem>
                      <MenuItem value={"False"}>False</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid item xs={12} sm={2}>
            <Button
              variant="outlined"
              fullWidth={true}
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="outlined" fullWidth={true} onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateSchedule;
