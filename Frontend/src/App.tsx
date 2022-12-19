import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/homepage/index";
import MapPin from "./pages/MapPin/index";
import Schedule from "./pages/Schedule/index";
import AGVPool from "./pages/logo3/index";
import Login from "./pages/login/index";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import themeLight from "./assets/theme-light";
import themeDark from "./assets/theme-dark";
import SignIn from "./pages/signin";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { usersActions } from "./store/userSlice";

function App() {
  const reduxTheme: string = useAppSelector((state) => state.theme);
  const reduxIsLoggedIn: boolean = useAppSelector((state) => state.isLoggedIn);
  const localUsername = localStorage.getItem("username");
  const localIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const localToken = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  // User data reloader
  useEffect(() => {
    if (localUsername || localIsLoggedIn || localToken) {
      dispatch(usersActions.updateUser(localUsername!));
      dispatch(usersActions.updateIsLoggedIn(localIsLoggedIn));
      dispatch(usersActions.updateToken(localToken!));
    }
  }, [dispatch, localIsLoggedIn, localToken, localUsername]);

  return (
    <>
      <ThemeProvider
        theme={reduxTheme === "themeLight" ? themeLight : themeDark}
      >
        <CssBaseline />
        <Routes>
          {reduxIsLoggedIn ? (
            <Route path="*" element={<Navigate to="/home" />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          {!reduxIsLoggedIn && (
            <Route path="/logIn" element={<Login></Login>} />
          )}
          {!reduxIsLoggedIn && (
            <Route path="/signIn" element={<SignIn></SignIn>} />
          )}
          {reduxIsLoggedIn && <Route path="/home" element={<Home></Home>} />}
          {reduxIsLoggedIn && (
            <Route path="/mappin" element={<MapPin></MapPin>} />
          )}
          {reduxIsLoggedIn && (
            <Route path="/schedule" element={<Schedule></Schedule>} />
          )}
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
