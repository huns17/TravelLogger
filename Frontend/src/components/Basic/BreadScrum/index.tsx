import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { usersActions } from "../../../store/userSlice";

interface breadScrumType {
  breadScrumTile: string;
}

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

// Making title for breadscrum
export default function BasicBreadcrumbs({ breadScrumTile }: breadScrumType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reduxTheme: string = useAppSelector((state) => state.theme);

  return (
    <div onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{
            color: reduxTheme === "themeLight" ? "primary.main" : "white",
          }}
        >
          <HomeIcon
            sx={{ width: "18px", height: "18px", cursor: "pointer" }}
            onClick={() => {
              navigate("/home");
              dispatch(usersActions.updateDashboardIndex(0));
            }}
          />
        </Link>
        <Typography variant="body1" sx={{ marginBottom: "5px" }}>
          {breadScrumTile}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
