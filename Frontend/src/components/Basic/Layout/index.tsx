import Navbar from "../Topbar/index";
import Sidebar from "../SideBar";
import MainContainer from "../MainContainer";
import ReactDataGridEx from "../../MainContainerTemplate";
import { useLocation } from "react-router-dom";
import Home from "../../Home/index";
import ViewSchedule from "../../Schedule/ViewSchedule";
const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", width: "100%" }}>
        <Sidebar />
        {/* rendering corresponding child elements according to location url */}
        <MainContainer>
          {location.pathname === "/home" && <Home />}
          {location.pathname === "/schedule" && <ViewSchedule />}
        </MainContainer>
      </div>
    </>
  );
};

export default Layout;
