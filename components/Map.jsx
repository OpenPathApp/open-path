
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import './Map.css'

export const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAP6ZI6gP5_EmAu8md6W8uXBNM3eEXqx_A',
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

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
