import React from "react";
import MapPinComponents from "../../components/Mappin/MapPin/index";
import Topbar from "../../components/Basic/Topbar/index";
function MapPin(props: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Topbar />
      <MapPinComponents />
    </div>
  );
}

export default MapPin;
