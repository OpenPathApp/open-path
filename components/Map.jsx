import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect, useContext } from "react";
import { getSafetyLatLong, getRestroomsLatLong, getHotelsLatLong, getRestaurantsLatLong } from "@/data";
import { FilterContext } from '../src/FilterContext';

export const Map = ({ center }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAP6ZI6gP5_EmAu8md6W8uXBNM3eEXqx_A',
  });

  const [safetyRating, setSafetyRating] = useState(null);

  const { showRestrooms, showHotels, showRestaurants } = useContext(FilterContext);

  const [restrooms, setRestrooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [selectedRestroom, setSelectedRestroom] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    getRestroomsLatLong([center.lat, center.lng]).then(data => setRestrooms(data));
    getHotelsLatLong([center.lat, center.lng]).then(data => setHotels(data));
    getRestaurantsLatLong([center.lat, center.lng]).then(data => setRestaurants(data));
  }, [center]);

  useEffect(() => {
    if (selectedRestroom) {
      getSafetyLatLong([[selectedRestroom.latitude, selectedRestroom.longitude]])
        .then((ratings) => setSafetyRating(ratings[0]));
    }
  }, [selectedRestroom]);

  useEffect(() => {
    if (selectedHotel) {
      getSafetyLatLong([[selectedHotel.latitude, selectedHotel.longitude]])
        .then((ratings) => setSafetyRating(ratings[0]));
    }
  }, [selectedHotel]);

  useEffect(() => {
    if (selectedRestaurant) {
      getSafetyLatLong([[selectedRestaurant.latitude, selectedRestaurant.longitude]])
        .then((ratings) => setSafetyRating(ratings[0]));
    }
  }, [selectedRestaurant]);

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

          {showHotels && hotels.map((hotel) => (
            <Marker
              key={hotel.name}
              position={{ lat: hotel.latitude, lng: hotel.longitude }}
              onClick={() => setSelectedHotel(hotel)}
              icon={"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
            />
          ))}

          {selectedHotel && (
            <InfoWindow
              position={{ lat: selectedHotel.latitude, lng: selectedHotel.longitude }}
              onCloseClick={() => {
                setSelectedHotel(null);
                setSafetyRating(null);
              }}
            >
              <div>
                <h1>{selectedHotel.name}</h1>
                {<p>Safety: {safetyRating}</p>}
              </div>
            </InfoWindow>
          )}

          {showRestaurants && restaurants.map((restaurant) => (
            <Marker
              key={restaurant.name}
              position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
              onClick={() => setSelectedRestaurant(restaurant)}
              icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
            />
          ))}

          {selectedRestaurant && (
            <InfoWindow
              position={{ lat: selectedRestaurant.latitude, lng: selectedRestaurant.longitude }}
              onCloseClick={() => {
                setSelectedRestaurant(null);
                setSafetyRating(null);
              }}
            >
              <div>
                <h1>{selectedRestaurant.name}</h1>
                {<p>Safety: {safetyRating}</p>}
              </div>
            </InfoWindow>
          )}
    
        </GoogleMap>
      )}
    </div>
  );
};
