import React from 'react';
import { FilterContext } from '../src/FilterContext';

export const Filter = () => {
  const { setShowRestrooms } = React.useContext(FilterContext);

  return (
    <div className="flex justify-around items-center p-4 bg-neutral-900 rounded-md shadow-md mt-10 mx-auto w-2/5">
      <label className="flex items-center">
        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-750" />
        <span className="ml-5 text-yellow-400 font-bold">Hotels</span>
      </label>

      <label className="flex items-center">
        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-750" />
        <span className="ml-5 text-green-400 font-bold">Restaurants</span>
      </label>

      <label className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-750"
        onChange={(e) => setShowRestrooms(e.target.checked)}
      />
      <span className="ml-5 text-pink-400 font-bold">Restrooms</span>
    </label>
    </div>
  );
};
