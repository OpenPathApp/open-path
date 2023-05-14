
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import './Map.css'

export const nearbyPlaces = {name:[], coords:[]}

function getNearbyPlaces(results){
    nearbyPlaces.name.push(results["name"])
    nearbyPlaces.coords.push([results["geometry"]["location"]["lat"], results["geometry"]["location"]["lng"]] )
}

export const Type = (latCoord, longCoord, type) =>{
    var axios = require('axios');
    
        var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latCoord +'%2C' + longCoord+'&radius=1500&type='+type+'&keyword=cruise&key=AIzaSyAP6ZI6gP5_EmAu8md6W8uXBNM3eEXqx_A',
        headers: { }
        };
    
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
    
        //loop through response to find name and coordinates, then create markers 
        response.data["results"].forEach(getNearbyPlaces)
    
        })
        .catch(function (error) {
        console.log(error);
        });

};

export const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAP6ZI6gP5_EmAu8md6W8uXBNM3eEXqx_A',
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  //search for locations around and make list of them
  //filter list from apis
    
  //traverse thru list and create markers for each

  return (
    <div className="Map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: 18.52043, lng: 73.856743 }} />


        </GoogleMap>
      )}
    </div>
  );
};
