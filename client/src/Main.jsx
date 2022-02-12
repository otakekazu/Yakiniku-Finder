import React, { useState } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./Main.scss";
import useMap from "./Hooks";
import RestaurantMarker from "./RestaurantMarker";

function Main() {
  const [activeMarker, setActiveMarker] = useState();

  const [
    setMap,
    center,
    isLoading,
    setIsLoading,
    marks,
    setSearchWord,
    searchRestaurant,
  ] = useMap();

  const mapStyle = {
    width: "1000px",
    height: "500px",
  };

  const restaurantDatas = [
    { label: "焼肉屋", value: "yakiniku" },
    { label: "ラーメン屋", value: "ramen" },
    { label: "中華料理屋", value: "chainese food" },
    { label: "ケバブ屋", value: "kebab" },
  ];

  const onClickMap = (e) => {
    if (!e.placeId) {
      searchRestaurant(e);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
      libraries={["places"]}
    >
      <div className={"slctCategory"}>
        <select
          name="restaurantCategory"
          onChange={(e) =>
            setSearchWord(
              e.nativeEvent.target.value != "all"
                ? {
                    type: "single",
                    data: {
                      label:
                        e.nativeEvent.target[e.nativeEvent.target.selectedIndex]
                          .text,
                      value: e.nativeEvent.target.value,
                    },
                  }
                : {
                    type: "multiple",
                    data: restaurantDatas,
                  }
            )
          }
        >
          {restaurantDatas.map((restaurantData) => (
            <option value={restaurantData.value} key={restaurantData.value}>
              {restaurantData.label}
            </option>
          ))}
          <option value={"all"} key={"all"}>
            一括表示
          </option>
        </select>
      </div>
      <div className={isLoading ? "isLoading" : ""}>
        <GoogleMap
          mapContainerStyle={mapStyle}
          zoom={16}
          center={center}
          onLoad={(map) => {
            setMap(map);
            setIsLoading(false);
          }}
          onClick={onClickMap}
        >
          {Object.keys(marks).map((key) => {
            return <RestaurantMarker key={key} value={marks[key]} />;
          })}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default Main;
