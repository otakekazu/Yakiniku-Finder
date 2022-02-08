import React, { useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import "./Main.scss";

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

  const onClick = (e) => {
    setIsLoading(true);
    let service = new window.google.maps.places.PlacesService(map);
    let slctPlace = new window.google.maps.LatLng(
      e.latLng.lat(),
      e.latLng.lng()
    );
    let request = {
      location: slctPlace,
      radius: "500",
      type: ["restaurant"],
      keyword: "yakiniku",
    };
    setCenter({
      lat: slctPlace.lat(),
      lng: slctPlace.lng(),
    });
    service.nearbySearch(request, (results, status) => {
      if (status == "OK") {
        setMark(results);
      } else {
        alert("近くに焼肉屋はありません。");
      }
      setIsLoading(false)
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_API_KEY}
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
          disableDefaultUI={false}
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
