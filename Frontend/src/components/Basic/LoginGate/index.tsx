import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const LoginGate = ({ children }: any) => {
  const reduxIsLoggedIn: boolean = useAppSelector((state) => state.isLoggedIn);

  // If User did not have token then it will show null
  return reduxIsLoggedIn ? (
    children
  ) : (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress disableShrink />
    </div>
  );
};

export default LoginGate;
