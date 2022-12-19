import "./signin.css";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQueryMutationInvalidateHooksPost } from "../../hooks/useQueryMutationInvalidateHooks";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { usersActions } from "../../store/userSlice";

interface signinObjectType {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

const SigninComponents = () => {
  let navigate = useNavigate();
  const [signinObject, setSigninOject] = useState<signinObjectType>({
    email: "",
    password: "string",
    passwordConfirm: "",
    name: "",
  });
  const {
    mutate,
    error,
    isError,
    isSuccess,
    data: userData,
  } = useQueryMutationInvalidateHooksPost(
    "https://hans-node-api.herokuapp.com/api/v1/users/signup"
  );
  const dispatch = useAppDispatch();

  // Handler function
  const signinObjectChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSigninOject((prev: signinObjectType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //  Button functions
  const submitHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      !signinObject?.email ||
      !signinObject?.password ||
      !signinObject?.passwordConfirm ||
      !signinObject?.name
    ) {
      alert("Please input all required fields.");
    } else if (
      signinObject?.email &&
      signinObject?.password &&
      signinObject?.passwordConfirm &&
      signinObject?.name
    ) {
      //  fetching data
      const temp = {
        ...signinObject,
      };
      mutate(temp);
    }
    event.preventDefault();
  };

  // Login prcoess handler
  useEffect(() => {
    if (isSuccess) {
      dispatch(usersActions.updateUser(userData?.data?.data?.user?.name));
      dispatch(usersActions.updateToken(userData?.data?.token));
      dispatch(usersActions.updateIsLoggedIn(!!userData?.data?.token));
      localStorage.setItem("isLoggedIn", String(!!userData?.data?.token));
      localStorage.setItem("token", String(userData?.data?.token));
      localStorage.setItem(
        "username",
        String(userData?.data?.data?.user?.name)
      );
      alert(
        `Succeeded in signIn. Welcome ${userData?.data?.data?.user?.name}!`
      );
      navigate("/home");
    }

    if (isError) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data?.err?.message);
      }
    }
  }, [isSuccess, isError, userData, error, navigate, dispatch]);

  return (
    <Box className="signin">
      <Box className="signinWrapper">
        <Box className="signinTop">
          <h3 className="signinLogo">Travel Logger</h3>
        </Box>
        <Box className="signinBottom">
          <Box className="signinBox">
            <TextField
              required
              placeholder="User Name"
              label="User Name"
              variant="outlined"
              name="name"
              onChange={signinObjectChangeHandler}
            />
            <TextField
              required
              placeholder="Email"
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              onChange={signinObjectChangeHandler}
            />
            <TextField
              required
              placeholder="Password"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              onChange={signinObjectChangeHandler}
            />
            <TextField
              required
              placeholder="Password Confrimed"
              label="Password Confrimed"
              variant="outlined"
              type="password"
              name="passwordConfirm"
              onChange={signinObjectChangeHandler}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#26127d" }}
              onClick={submitHandler}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#26127d" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Go back
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SigninComponents;
