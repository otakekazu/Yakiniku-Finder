import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

function RestaurantMarker(props) {
  const [activeMarker, setActiveMarker] = useState();
  const mark = props.value;

  const onClickMarker = (placeId) => {
    if (placeId === activeMarker) {
      return;
    }
    setActiveMarker(placeId);
  };

  return (
    <Marker
      position={{
        lat: mark.geometry.location.lat(),
        lng: mark.geometry.location.lng(),
      }}
      label={mark.name}
      onClick={() => onClickMarker(mark.place_id)}
    >
      {mark.place_id === activeMarker ? (
        <InfoWindow
          position={{
            lat: mark.geometry.location.lat(),
            lng: mark.geometry.location.lng(),
          }}
          onCloseClick={() => setActiveMarker(null)}
        >
          <div className={"balloon"}>
            <div className={"restaurantInfo"}>
              <h1>{mark.name}</h1>
              <h3>住所：{mark.vicinity}</h3>
              <h3>評価：{mark.rating}</h3>
              <a
                href={
                  "https://www.google.com/search?q=" +
                  mark.name +
                  "+" +
                  mark.plus_code.compound_code.split(" ")[1].replace("、", " ")
                }
                target={"_blank"}
              >
                Googleで店名を検索
              </a>
            </div>
            <div className={"restaurantPhotos"}>
              <img src={mark.photos[0].getUrl()} alt={""} />
            </div>
          </div>
        </InfoWindow>
      ) : null}
    </Marker>
  );
}

export default RestaurantMarker;
