import React from "react";

const FilterContext = React.createContext(null);

const FilterProvider = ({ children }) => {
  const [showRestrooms, setShowRestrooms] = React.useState(true);
  const [showHotels, setShowHotels] = React.useState(true);
  const [showRestaurants, setShowRestaurants] = React.useState(true);

  // Memoize the context value to prevent unnecessary re-renders.
  const contextValue = React.useMemo(() => {
    return {
      showRestrooms,
      setShowRestrooms,
      showHotels,
      setShowHotels,
      showRestaurants,
      setShowRestaurants,
    };
  }, [showRestrooms, showHotels, showRestaurants]);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
