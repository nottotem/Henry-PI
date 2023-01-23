import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByGenres,
  filterByCreated,
  sortGames,
} from "../../redux/actions";
import "./Filters.css";

const Filters = () => {
  let { genres, filtersApplied } = useSelector((state) => state);

  let dispatch = useDispatch();

  const [sortState, setSortState] = useState(filtersApplied.sort);

  const handleGenres = (event) => {
    dispatch(filterByGenres(event.target.value));
    if (sortState !== "none") {
      dispatch(sortGames(sortState));
    }
  };

  const handleCreated = (event) => {
    dispatch(filterByCreated(event.target.value));
    if (sortState !== "none") {
      dispatch(sortGames(sortState));
    }
  };

  const handleSort = (event) => {
    dispatch(sortGames(event.target.value));
    setSortState(event.target.value);
  };

  return (
    <div>
      {/* GENRE FILTERS */}
      <div>
        <select name="genres" id="genres" onChange={handleGenres}>
          <option
            selected={filtersApplied.genres === "none" ? true : false}
            disabled
          >
            Genre
          </option>
          <option
            value="All"
            name="All"
            selected={filtersApplied.genres === "All" ? true : false}
          >
            All
          </option>
          {genres.map((genre) => (
            <option
              key={genre.id}
              value={genre.name}
              name={genre.name}
              selected={filtersApplied.genres === genre.name ? true : false}
            >
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      {/* CREATED FILTERS */}
      <div>
        <select name="created" onChange={handleCreated}>
          <option
            selected={filtersApplied.created === "none" ? true : false}
            disabled
          >
            Origin
          </option>
          <option
            value="All"
            name="All"
            selected={filtersApplied.created === "All" ? true : false}
          >
            All
          </option>
          <option
            value="DB"
            name="DB"
            selected={filtersApplied.created === "DB" ? true : false}
          >
            Database
          </option>
          <option
            value="API"
            name="API"
            selected={filtersApplied.created === "API" ? true : false}
          >
            API
          </option>
        </select>
      </div>
      {/* SORT FILTERS */}
      <div>
        <select name="orderName" onChange={handleSort}>
          <option
            selected={filtersApplied.sort === "none" ? true : false}
            disabled
          >
            Sort
          </option>
          <option
            value="nameAsc"
            name="asc"
            selected={filtersApplied.sort === "nameAsc" ? true : false}
          >
            A-Z
          </option>
          <option
            value="nameDesc"
            name="desc"
            selected={filtersApplied.sort === "nameDesc" ? true : false}
          >
            Z-A
          </option>
          <option
            value="ratingDesc"
            name="desc"
            selected={filtersApplied.sort === "ratingDesc" ? true : false}
          >
            Rating + / -
          </option>
          <option
            value="ratingAsc"
            name="asc"
            selected={filtersApplied.sort === "ratingAsc" ? true : false}
          >
            Rating - / +
          </option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
