import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { usersActions } from "../../../store/userSlice";
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { useLocation } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function SelectedListItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const reduxDashboardIndex: number = useAppSelector(
    (state) => state.dashboardIndex
  );
  const [selectedIndex, setSelectedIndex] =
    useState<number>(reduxDashboardIndex);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const location = useLocation();
  const reduxTheme: string = useAppSelector((state) => state.theme);

  // routing for sidebar to each coressponding components
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (index === 0) {
      navigate("/home");
      setSelectedIndex(index);
      dispatch(usersActions.updateDashboardIndex(index));
      localStorage.setItem("index", index.toString());
    } else if (index === 1) {
      navigate("/mappin");
      setSelectedIndex(index);
      dispatch(usersActions.updateDashboardIndex(index));
      localStorage.setItem("index", index.toString());
    } else if (index === 2) {
      navigate("/schedule");
      setSelectedIndex(index);
      dispatch(usersActions.updateDashboardIndex(index));
      localStorage.setItem("index", index.toString());
    } else if (index === 3) {
      navigate("/logo3");
      setSelectedIndex(index);
      dispatch(usersActions.updateDashboardIndex(index));
      localStorage.setItem("index", index.toString());
    }
  };

  const sidebarIndexReloader = useCallback(() => {
    if (location.pathname === "/home") {
      localStorage.setItem("index", "0");
      dispatch(usersActions.updateDashboardIndex(0));
      setSelectedIndex(0);
    } else if (location.pathname === "/mappin") {
      localStorage.setItem("index", "1");
      dispatch(usersActions.updateDashboardIndex(1));
      setSelectedIndex(1);
    } else if (location.pathname === "/schedule") {
      localStorage.setItem("index", "2");
      dispatch(usersActions.updateDashboardIndex(2));
      setSelectedIndex(2);
    }
  }, [dispatch, location.pathname]);

  // Tracking sidebar index whenever app is refreshed
  useEffect(() => {
    sidebarIndexReloader();
  }, [sidebarIndexReloader]);

  return (
    <>
      {!matches ? (
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 50px)",
            maxWidth: 250,
            bgcolor: "background.paper",
            marginTop: "20px",
            borderRight: "1px solid black",
            padding: "20px",
          }}
        >
          <List component="nav" aria-label="second folders">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <HomeIcon
                  sx={{
                    color:
                      reduxTheme === "themeLight" ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <Divider />
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
              sx={{ marginTop: "10px" }}
            >
              <ListItemIcon>
                <PublicIcon
                  sx={{
                    color:
                      reduxTheme === "themeLight" ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Map Pin" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <CalendarMonthIcon
                  sx={{
                    color:
                      reduxTheme === "themeLight" ? "primary.main" : "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Schedule" />
            </ListItemButton>
          </List>
        </Box>
      ) : null}
    </>
  );
}
