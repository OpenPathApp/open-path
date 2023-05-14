import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useMemo, useState, useEffect, useContext } from "react";
import { getSafetyLatLong, getRestroomsLatLong } from "@/data";
import { FilterContext } from '../src/FilterContext';

export const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAP6ZI6gP5_EmAu8md6W8uXBNM3eEXqx_A',
  });
  const center = useMemo(() => ({ lat: 40.730610, lng: -73.935242 }), []);
  
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

  return (
    <div className="h-[48rem] w-3/4 m-auto rounded-lg mt-10 overflow-hidden">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="h-3/4 w-full"
          center={center}
          zoom={14}
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
                <h2>{selectedRestroom.name}</h2>
                {<p>Safety: {safetyRating}</p>}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};
