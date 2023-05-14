'use client'
import React from 'react'
import { Header } from '../../components/Header'
import { Filter } from '../../components/Filter'
import { Map } from '../../components/Map'
import { FilterContext } from "../FilterContext";

export default function Home() {
  const [showRestrooms, setShowRestrooms] = React.useState(false);

  return (
    <FilterContext.Provider value={{ showRestrooms, setShowRestrooms }}>
      {/* Your components here */}
      <Header />
      <Filter />
      <Map />
    </FilterContext.Provider>
  );
}
