import React from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import "./Main.scss";
import useMap from "./Hooks";

function Main() {
  const [setMap, center, isLoading, setIsLoading, marks, searchRestaurant] =
    useMap();

  const mapStyle = {
    width: "1000px",
    height: "500px",
  };

  const onClick = (e) => {
    if (!e.placeId) {
      searchRestaurant(e);
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
          {Object.keys(marks).map((key) => {
            return (
              <Marker
                key={key}
                position={{
                  lat: marks[key].geometry.location.lat(),
                  lng: marks[key].geometry.location.lng(),
                }}
                label={marks[key].name}
              />
            );
          })}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default Main;
