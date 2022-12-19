/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./login.css";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useQueryMutationInvalidateHooksPost } from "../../hooks/useQueryMutationInvalidateHooks";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { usersActions } from "../../store/userSlice";

interface loginObjectType {
  email: string;
  password: string;
}

const LoginComponents = () => {
  let navigate = useNavigate();
  const [loginObject, setLoginOject] = useState<loginObjectType>({
    email: "",
    password: "",
  });
  const {
    mutate,
    error,
    isError,
    isSuccess,
    data: userData,
  } = useQueryMutationInvalidateHooksPost(
    "https://hans-node-api.herokuapp.com/api/v1/users/login"
  );
  const dispatch = useAppDispatch();

  // Handler function
  const loginObjectChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginOject((prev: loginObjectType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Signin process handler
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("isLoggedIn", String(!!userData?.data?.token));
      localStorage.setItem("token", String(userData?.data?.token));
      localStorage.setItem(
        "username",
        String(userData?.data?.data?.user?.name)
      );
      dispatch(usersActions.updateUser(userData?.data?.data?.user?.name));
      dispatch(usersActions.updateToken(userData?.data?.token));
      alert(`Succeeded in login. Welcome ${userData?.data?.data?.user?.name}!`);
      navigate("/home");
    }

    if (isError) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data?.message);
      }
    }

    return () => {
      if (isSuccess) {
        dispatch(usersActions.updateIsLoggedIn(!!userData?.data?.token));
      }
    };
  }, [
    navigate,
    error,
    isSuccess,
    isError,
    dispatch,
    userData?.data?.data?.user?.name,
    userData?.data?.token,
  ]);

  //  Button functions
  const submitHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!loginObject?.email || !loginObject?.password) {
      alert("Please input all required fields.");
    } else if (loginObject?.email && loginObject.password) {
      //  fetching data
      const temp = {
        ...loginObject,
      };
      mutate(temp);
    }
  };

  return (
    <Box className="login">
      <Box className="loginWrapper">
        <Box className="loginTop">
          <h3 className="loginLogo">Travel Logger</h3>
        </Box>
        <Box className="loginBottom">
          <Box className="loginBox">
            <TextField
              placeholder="Email"
              label="Email"
              variant="outlined"
              name="email"
              onChange={loginObjectChangeHandler}
            />
            <TextField
              placeholder="Password"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              onChange={loginObjectChangeHandler}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#26127d" }}
              onClick={submitHandler}
            >
              Log In
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#26127d" }}
              onClick={() => {
                navigate("/signIn");
              }}
            >
              Create a New Account
            </Button>
            <span className="loginForgot">Forgot Password?</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginComponents;
