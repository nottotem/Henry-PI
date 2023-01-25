/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_GAMES, getGames, getGenres } from "../../redux/actions";
import Card from "../Card/Card";
import "./Cards.css";
import Loader from "../Loader/Loader";

const Cards = () => {
  const { filteredGames, filtersApplied, genres, games } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!genres.length) {
      dispatch(getGenres());
    }
    dispatch(getGames());
  }, []);

  //Función que hace todos los filtros y ordenamiento
  const filterGames = () => {
    let allGames = games;

    if (filtersApplied.created !== "none" && filtersApplied.created !== "All") {
      if (filtersApplied.created === "DB") {
        allGames = allGames.filter((game) => game.created === true);
      } else {
        allGames = allGames.filter((game) => game.created === false);
      }
    }

    if (filtersApplied.genres !== "none" && filtersApplied.genres !== "All") {
      allGames = allGames.filter((game) =>
        game.genres.includes(filtersApplied.genres)
      );
    }

    if (filtersApplied.sort === "nameAsc")
      allGames.sort((a, b) => a.name.localeCompare(b.name));
    if (filtersApplied.sort === "nameDesc")
      allGames.sort((b, a) => a.name.localeCompare(b.name));
    if (filtersApplied.sort === "ratingAsc")
      allGames.sort((a, b) => a.rating - b.rating);
    if (filtersApplied.sort === "ratingDesc")
      allGames.sort((b, a) => a.rating - b.rating);

    return allGames;
  };

  useEffect(() => {
    if (!games.length) return;
    let aux = filterGames();
    dispatch({ type: FILTER_GAMES, payload: aux });
  }, [filtersApplied, games]);

  return (
    <div className="cardsContainer">
      {filteredGames.length ? (
        filteredGames.error ? (
          <h4>Error</h4>
        ) : (
          filteredGames.map((game) => {
            return (
              <Card
                name={game.name}
                rating={game.rating}
                genres={game.genres}
                background_image={game.background_image}
                key={game.name}
              />
            );
          })
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Cards;
