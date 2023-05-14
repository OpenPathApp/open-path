import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useMemo, useState, useEffect, useContext } from "react";
import { getSafetyLatLong, getRestroomsLatLong } from "@/data";
import { FilterContext } from '../src/FilterContext';

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

export const Map = ({ center }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAP6ZI6gP5_EmAu8md6W8uXBNM3eEXqx_A',
  });
  
  const [restrooms, setRestrooms] = useState([]);
  const [selectedRestroom, setSelectedRestroom] = useState(null);

  useEffect(() => {
    getRestroomsLatLong([center.lat, center.lng]).then(data => setRestrooms(data));
  }, [center]);

  const { showRestrooms } = useContext(FilterContext);

  const [safetyRating, setSafetyRating] = useState(null);

  useEffect(() => {
    if (selectedRestroom) {
      getSafetyLatLong([[selectedRestroom.latitude, selectedRestroom.longitude]])
        .then((ratings) => setSafetyRating(ratings[0]));
    }
  }, [selectedRestroom]);

  //search for locations around and make list of them
  //filter list from apis
    
  //traverse thru list and create markers for each

  return (
    <div className="h-[48rem] w-3/4 m-auto rounded-lg mt-10 overflow-hidden">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="h-3/4 w-full"
          center={center}
          zoom={15}
        >
          {showRestrooms && restrooms.map((restroom) => (
            <Marker
              key={restroom.name}
              position={{ lat: restroom.latitude, lng: restroom.longitude }}
              onClick={() => setSelectedRestroom(restroom)}
              icon={"http://maps.google.com/mapfiles/ms/icons/pink-dot.png"}
            />
          ))}

          {selectedRestroom && (
            <InfoWindow
              position={{ lat: selectedRestroom.latitude, lng: selectedRestroom.longitude }}
              onCloseClick={() => {
                setSelectedRestroom(null);
                setSafetyRating(null);
              }}
            >
              <div>
                <h1>{selectedRestroom.name}</h1>
                {<p>Safety: {safetyRating}</p>}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};
