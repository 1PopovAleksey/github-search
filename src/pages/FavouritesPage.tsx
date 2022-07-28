import React from "react";
import {useAppSelector} from "../hooks/redux";

export function FavouritesPage() {
  const {favourites} = useAppSelector(state => state.github);

  if (favourites.length === 0) {
    return <div className="flex items-center flex-wrap flex-col pt-10 pb-10 mx-auto">
      <p className="text-center">No items...</p>
    </div>
  }

  return (
    <div className="flex items-center flex-wrap flex-col pt-10 pb-10 mx-auto">
      <ul className="list-none">
        {favourites.map(f => (
          <li key={f}>
            <a href={f} target="_blank" rel="noopener noreferrer">{f}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FavouritesPage;
