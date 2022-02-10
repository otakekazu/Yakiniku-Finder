import { useState, useEffect } from "react";

const useMap = () => {
  const [map, setMap] = useState();
  const [center, setCenter] = useState({
    lat: 35.6809591,
    lng: 139.7673068,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [marks, setMarks] = useState({});
  const [service, setService] = useState();

  useEffect(() => {
    map && map.panTo(center);
  }, [center]);

  useEffect(() => {
    map && setService(new window.google.maps.places.PlacesService(map));
  }, [map]);

  const searchRestaurant = (e) => {
    setIsLoading(true);
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
        setMarks(results);
      } else {
        alert("近くに焼肉屋はありません。");
      }
      setIsLoading(false);
    });
  };
  return [setMap, center, isLoading, setIsLoading, marks, searchRestaurant];
};

export default useMap;
