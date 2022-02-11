import React, { useState } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./Main.scss";
import useMap from "./Hooks";

function Main() {
  const [activeMarker, setActiveMarker] = useState();
  const [setMap, center, isLoading, setIsLoading, marks, searchRestaurant] =
    useMap();

  const mapStyle = {
    width: "1000px",
    height: "500px",
  };

  const mapOnClick = (e) => {
    if (!e.placeId) {
      searchRestaurant(e);
    }
  };

  const markerOnClick = (placeId) => {
    if (placeId === activeMarker) {
      return;
    }
    setActiveMarker(placeId);
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
          onClick={mapOnClick}
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
                onClick={() => markerOnClick(marks[key].place_id)}
              >
                {marks[key].place_id === activeMarker ? (
                  <InfoWindow
                    position={{
                      lat: marks[key].geometry.location.lat(),
                      lng: marks[key].geometry.location.lng(),
                    }}
                    onCloseClick={() => setActiveMarker(null)}
                  >
                    <div className={"balloon"}>
                      <div className={"restaurantInfo"}>
                        <h1>{marks[key].name}</h1>
                        <h3>住所：{marks[key].vicinity}</h3>
                        <h3>評価：{marks[key].rating}</h3>
                        <a
                          href={
                            "https://www.google.com/search?q=" +
                            marks[key].name +
                            "+" +
                            marks[key].plus_code.compound_code
                              .split(" ")[1]
                              .replace("、", " ")
                          }
                          target={"_blank"}
                        >
                          Googleで店名を検索
                        </a>
                      </div>
                      <div className={"restaurantPhotos"}>
                        <img src={marks[key].photos[0].getUrl()} alt={""} />
                      </div>
                    </div>
                  </InfoWindow>
                ) : null}
              </Marker>
            );
          })}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default Main;
