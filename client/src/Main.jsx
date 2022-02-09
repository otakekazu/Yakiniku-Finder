import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import "./Main.scss";
import { searchRestaurant } from "./Hooks";

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [map, setMap] = useState();
  const [mark, setMark] = useState({});
  const [center, setCenter] = useState({
    lat: 35.6809591,
    lng: 139.7673068,
  });

  const mapStyle = {
    width: "1000px",
    height: "500px",
  };

  useEffect(() => {
    map && map.panTo(center);
  }, [center]);

  const onClick = (e) => {
    if (!e.placeId) {
      setIsLoading(true);
      searchRestaurant(e, map, setCenter, setMark, setIsLoading);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
      libraries={["places"]}
    >
      <div className={isLoading ? "isLoading" : ""}>
        <GoogleMap
          mapContainerStyle={mapStyle}
          zoom={16}
          center={center}
          onLoad={(map) => {
            setMap(map);
            setIsLoading(false);
          }}
          onClick={onClick}
        >
          {Object.keys(mark).map((key) => {
            return (
              <Marker
                key={key}
                position={{
                  lat: mark[key].geometry.location.lat(),
                  lng: mark[key].geometry.location.lng(),
                }}
                label={mark[key].name}
              />
            );
          })}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default Main;
