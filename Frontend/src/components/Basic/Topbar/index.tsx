import { Toolbar, Typography, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import StyledBadge from "../StyledBadge";
import MuiThemeSwitch from "../MuiThemeSwitch";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { usersActions } from "../../../store/userSlice";
import "./topbar.css";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerComponent from "../Drawer";

const Navbar = () => {
  let navigate = useNavigate();
  const [checked, setChecked] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const reduxTheme: string = useAppSelector((state) => state.theme);
  const reduxUserName: string = useAppSelector((state) => state.user);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  // Making default username inside avatar
  const makeUserNameForAvatar = () => {
    const temp = reduxUserName?.charAt(0) + reduxUserName?.slice(-1);
    return temp;
  };

  // Changing theme according to MuiThemeSwtich
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    let tempTheme;
    if (event.target.checked === true) {
      tempTheme = "themeLight";
      dispatch(usersActions.updateTheme(tempTheme));
    } else if (event.target.checked === false) {
      tempTheme = "themeDark";
      dispatch(usersActions.updateTheme(tempTheme));
    }
  };

  // Reload status of themeSwitch
  useEffect(() => {
    if (reduxTheme === "themeLight") {
      setChecked(true);
    } else if (reduxTheme === "themeDark") {
      setChecked(false);
    }
  }, [reduxTheme]);

  return (
    <>
      {!matches ? (
        <div className="navContainer">
          <AppBar
            position="sticky"
            sx={{
              background:
                reduxTheme === "themeLight"
                  ? "linear-gradient(to right bottom, #4263eb, #0071a8)"
                  : "#000008",
            }}
          >
            <Toolbar>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  padding: "10px",
                }}
                component="div"
              >
                <Typography
                  variant="body2"
                  component="div"
                  gutterBottom
                  sx={{ fontSize: "18px", marginTop: "5px", cursor: "pointer" }}
                  onClick={() => {
                    navigate("/home");
                    dispatch(usersActions.updateDashboardIndex(0));
                  }}
                >
                  TravelLogger
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <MuiThemeSwitch checked={checked} onChange={handleChange} />
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      sx={{
                        bgcolor: "secondary.main",
                        width: 27,
                        height: 27,
                        border: "1.5px solid white;",
                        color: "white",
                        fontSize: "15px",
                      }}
                    >
                      {makeUserNameForAvatar()}
                    </Avatar>
                  </StyledBadge>
                  <IconButton
                    aria-label="delete"
                    sx={{
                      borderRadius: "12px",
                      border: "0.1px solid white",
                      backgroundColor: "white",
                      width: "40px",
                      marginLeft: "12px",
                    }}
                    onClick={() => {
                      localStorage.clear();
                      dispatch(usersActions.reset());
                      navigate("/singIn");
                    }}
                  >
                    <LogoutIcon
                      fontSize="small"
                      sx={{ color: "secondary.main", fontSize: "17px" }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </div>
      ) : (
        <div className="navContainer">
          <AppBar
            position="sticky"
            sx={{
              background:
                reduxTheme === "themeLight"
                  ? "linear-gradient(to right bottom, #4263eb, #0071a8)"
                  : "#000008",
            }}
          >
            <Toolbar>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  padding: "10px",
                }}
                component="div"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <MenuIcon
                    onClick={() => {
                      setOpenDrawer(true);
                    }}
                  />
                  <Typography
                    variant="body2"
                    component="div"
                    gutterBottom
                    sx={{
                      fontSize: "18px",
                      marginTop: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/home");
                      dispatch(usersActions.updateDashboardIndex(0));
                    }}
                  >
                    TravelLogger
                  </Typography>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <MuiThemeSwitch checked={checked} onChange={handleChange} />
                  <IconButton
                    aria-label="delete"
                    sx={{
                      borderRadius: "12px",
                      border: "0.1px solid white",
                      backgroundColor: "white",
                      width: "40px",
                    }}
                    onClick={() => {
                      localStorage.clear();
                      dispatch(usersActions.reset());
                      navigate("/singIn");
                    }}
                  >
                    <LogoutIcon
                      fontSize="small"
                      sx={{ color: "secondary.main", fontSize: "17px" }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </div>
      )}
      <DrawerComponent openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default Navbar;
