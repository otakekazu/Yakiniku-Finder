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
  const [searchWord, setSearchWord] = useState({
    type: "single",
    data: {
      label: "焼肉屋",
      value: "yakiniku"
    }
  });

  useEffect(() => {
    map && map.panTo(center);
  }, [center]);

  useEffect(() => {
    map && setService(new window.google.maps.places.PlacesService(map));
  }, [map]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const searchRestaurant = async (e) => {
    setIsLoading(true);
    let slctPlace = new window.google.maps.LatLng(
      e.latLng.lat(),
      e.latLng.lng()
    );
    setCenter({
      lat: slctPlace.lat(),
      lng: slctPlace.lng(),
    });

    if (searchWord.type == "single") {
      await getResults(slctPlace, searchWord.data, (results) => {
        setMarks(results);
      });
      setIsLoading(false);
    } else if (searchWord.type == "multiple") {
      let resultsArray = new Array();
      for (const index in searchWord.data) {
        await getResults(slctPlace, searchWord.data[index], (results) => {
          resultsArray = resultsArray.concat(results);
        });
      }
      setMarks(resultsArray)
      setIsLoading(false);
    }
  };

  const getResults = (slctPlace, data, callback) => {
    return new Promise((resolve, reject) => {
      let request = {
        location: slctPlace,
        radius: "500",
        type: ["restaurant"],
        keyword: data.value,
      };
      service.nearbySearch(request, (results, status) => {
        if (status == "OK") {
          callback(results);
        } else {
          alert(data.label + "は見つかりませんでした。");
        }
        resolve(0);
      });
    });
  };

  return [
    setMap,
    center,
    isLoading,
    setIsLoading,
    marks,
    setSearchWord,
    searchRestaurant,
  ];
};

export default useMap;
