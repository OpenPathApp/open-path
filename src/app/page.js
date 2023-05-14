'use client'
import React from 'react'
import { Header } from '../../components/Header'
import { Filter } from '../../components/Filter'
import { Map } from '../../components/Map'
import { FilterContext } from "../FilterContext";
import { locationToLatLong } from '@/data'

export default function Home() {
  const [showRestrooms, setShowRestrooms] = React.useState(false);

  const [center, setCenter] = React.useState({ lat: 40.73061, lng: -73.935242 });

  const handleSearch = async (location) => {
    const [lat, lng] = await locationToLatLong(location);
    if (typeof lat === "number" && typeof lng === "number") {
      setCenter({ lat, lng });
    } else {
      console.error(`Invalid coordinates for location: ${location}`);
    }
  };


  return (
    <FilterContext.Provider value={{ showRestrooms, setShowRestrooms }}>
      {/* Your components here */}
      <Header onSearch={handleSearch} />
      <Filter />
      <Map center={center} />
    </FilterContext.Provider>
  );
}
