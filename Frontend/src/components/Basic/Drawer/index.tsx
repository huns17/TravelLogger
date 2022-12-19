import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Divider from "@mui/material/Divider";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { usersActions } from "../../../store/userSlice";

interface drawerType {
  openDrawer: boolean;
  setOpenDrawer: (arg0: boolean) => void;
}
const DrawerComponent = ({ openDrawer, setOpenDrawer }: drawerType) => {
  let navigate = useNavigate();
  const reduxTheme: string = useAppSelector((state) => state.theme);

  // routing for sidebar to each coressponding components
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (index === 0) {
      navigate("/home");
      setOpenDrawer(false);
    } else if (index === 1) {
      navigate("/mappin");
      setOpenDrawer(false);
    } else if (index === 2) {
      navigate("/schedule");
      setOpenDrawer(false);
    }
  };

  return (
    <Drawer anchor="left" open={openDrawer}>
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
          <ListItemButton onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemIcon>
              <HomeIcon
                sx={{
                  color: reduxTheme === "themeLight" ? "primary.main" : "white",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <Divider
            sx={{
              color: reduxTheme === "themeLight" ? "primary.main" : "white",
            }}
          />
          <ListItemButton
            onClick={(event) => handleListItemClick(event, 1)}
            sx={{ marginTop: "10px" }}
          >
            <ListItemIcon>
              <PublicIcon
                sx={{
                  color: reduxTheme === "themeLight" ? "primary.main" : "white",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Map Pin" />
          </ListItemButton>
          <ListItemButton onClick={(event) => handleListItemClick(event, 2)}>
            <ListItemIcon>
              <CalendarMonthIcon
                sx={{
                  color: reduxTheme === "themeLight" ? "primary.main" : "white",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
