import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

function Main() {
  const [map, setMap] = useState();
  const [mark, setMark] = useState({});

  const mapStyle = {
    width: "1000px",
    height: "500px",
  };
  let center = {
    lat: 35.6809591,
    lng: 139.7673068,
  };

  const onClick = (e) => {
    let service = new window.google.maps.places.PlacesService(map);
    let slctPlace = new window.google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
    let request = {
      location: slctPlace,
      radius: "500",
      type: ["restaurant"],
      keyword: "yakiniku",
    };
    center = {
      lat: slctPlace.lat(),
      lng: slctPlace.lng(),
    };
    service.nearbySearch(request, (results, status) => {
      if (status == "OK") {
        setMark(results);
      } else {
        alert("近くに焼肉屋はありません。");
      }
    });
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapStyle}
        zoom={16}
        center={center}
        onLoad={(map) => {setMap(map)}}
        onClick={onClick}
      >
        {Object.keys(mark).map((key)=> {
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
  );
}

export default Main;
