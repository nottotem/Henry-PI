/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_GAMES,
  getGames,
  getGenres,
  setPage,
} from "../../redux/actions";
import Card from "../Card/Card";
import "./Cards.css";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import Paginated from "../Paginated/Paginated";
import Warning from "../Warning/Warning";

const Cards = () => {
  const { filteredGames, filtersApplied, genres, games, currentPage } =
    useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!genres.length) {
      dispatch(getGenres());
    }
    dispatch(getGames());
  }, []);

  //------------------------------Filters------------------------------

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

  //------------------------------Filters------------------------------

  //------------------------------Paginated------------------------------

  const [gamesPerPage] = useState(15);

  //Primer juego para mostrar (rango slice)
  const firstIndex = (currentPage - 1) * gamesPerPage;
  //Ultimo juego para mostrar
  const lastIndex = firstIndex + gamesPerPage;
  const currentGames =
    filteredGames instanceof Array
      ? filteredGames.slice(firstIndex, lastIndex)
      : [];
  const filteredGamesLength = filteredGames.length;

  function paginated(page) {
    dispatch(setPage(page));
  }

  function next() {
    if (currentPage < filteredGamesLength / gamesPerPage) {
      let nextPage = currentPage + 1;
      dispatch(setPage(nextPage));
    }
  }

  function previous() {
    if (currentPage > 1) {
      let previousPage = currentPage - 1;
      dispatch(setPage(previousPage));
    }
  }

  //------------------------------Paginated------------------------------

  useEffect(() => {
    if (!games.length) return;
    if (games.length / gamesPerPage < currentPage) dispatch(setPage(1));
    let aux = filterGames();
    dispatch({ type: FILTER_GAMES, payload: aux });
  }, [filtersApplied, games]);

  return (
    <div className="divCardsContainer">
      {filteredGames.error ? (
        <Warning message={filteredGames.error} />
      ) : currentGames.length ? (
        <div className="cardsContainer">
          {currentGames.map((game) => {
            return (
              <Link
                key={game.id}
                to={`/videogames/detail/${game.id}`}
                style={{ color: "inherit" }}
              >
                <Card
                  name={game.name}
                  rating={game.rating}
                  genres={game.genres}
                  background_image={game.background_image}
                  key={game.name}
                />
              </Link>
            );
          })}
        </div>
      ) : games.length ? (
        <Warning message="No games were found with those filters" />
      ) : (
        <Loader />
      )}
      <Paginated
        games={filteredGamesLength}
        paginated={paginated}
        gamesPerPage={gamesPerPage}
        next={next}
        previous={previous}
      />
    </div>
  );
};

export default Cards;
