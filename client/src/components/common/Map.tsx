import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";
import React, { FunctionComponent } from "react";
import "leaflet/dist/leaflet.css";
import { ViewProps, MapProps } from "../../types/Map";

const ChangeView: FunctionComponent<ViewProps> = (props: ViewProps) => {
  const map = useMap();
  map.setView(props.center, props.zoom);
  return null;
};

const Map: FunctionComponent<MapProps> = (props: MapProps) => {
  const zippedCords = props.lat.map((x, i) => [x, props.long[i]]);
  return (
    <MapContainer
      style={{
        height: "350px",
        width: "100%",
        opacity: props.disabled ? "0.4" : "1",
      }}
      center={props.center}
      zoom={props.zoom}
      scrollWheelZoom={props.disabled ? false : true}
      zoomControl={props.disabled ? false : true}
      dragging={props.disabled ? false : true}
    >
      (<ChangeView center={props.center} zoom={props.zoom} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline
        pathOptions={{ fillColor: "red", color: "blue" }}
        positions={zippedCords as [number, number][]}
      />
      )
    </MapContainer>
  );
};

export default Map;
