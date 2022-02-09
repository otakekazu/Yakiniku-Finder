export const searchRestaurant = (e, map, setCenter, setMark, setIsLoading) => {
  let service = new window.google.maps.places.PlacesService(map);
  let slctPlace = new window.google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
  let request = {
    location: slctPlace,
    radius: "500",
    type: ["restaurant"],
    keyword: "yakiniku",
  };
  setCenter({
    lat: slctPlace.lat(),
    lng: slctPlace.lng()
  })
  service.nearbySearch(request, (results, status) => {
    if (status == "OK") {
      setMark(results);
    } else {
      alert("近くに焼肉屋はありません。");
    }
    setIsLoading(false);
  });
  return;
};
