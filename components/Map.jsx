
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

export const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAP6ZI6gP5_EmAu8md6W8uXBNM3eEXqx_A',
  });
  const center = useMemo(() => ({ lat: 40.730610, lng: -73.935242 }), []);

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
          <Marker position={{ lat: 40.730610, lng: -73.935242 }} />
        </GoogleMap>
      )}
    </div>
  );
};
