import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getGameDetails, resetGameDetail } from "../../redux/actions";
import "./GameDetails.css";
import Loader from "../Loader/Loader";
import Warning from "../Warning/Warning";

export default function Details() {
  let gameDetails = useSelector((state) => state.gameDetail);
  let { id } = useParams();

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameDetails(id));
    return dispatch(resetGameDetail());
  }, [id, dispatch]);

  const {
    name,
    background_image,
    Genres,
    description,
    release_date,
    rating,
    platforms,
  } = gameDetails;

  return (
    <div className="totalDetailContainer">
      {gameDetails.name ? (
        <div className="detailContainer">
          <div className="detailInfo">
            <div className="detailTop">
              <p className="detailReleased">{release_date}</p>
              <p className="detailRating">{rating}</p>
            </div>
            <div className="detailName">
              <h1>{name}</h1>
            </div>

            <div className="detailsGroup">
              <div className="detailGenres">
                <span>Géneros:</span>
                <p>{Genres.map((g) => `- ${g.name} `)}</p>
              </div>
              <div className="detailPlatforms">
                <span>Plataformas:</span> {platforms.map((p) => `- ${p} `)}
              </div>
              <p className="detailDescription">
                <span>Descripción:</span> {description.slice(0, 1500)}
              </p>
            </div>
          </div>
          <img src={background_image} alt="Imagen" />
        </div>
      ) : gameDetails.msgError ? (
        <div className="detailsWarning">
          <Warning message={gameDetails.msgError} />
        </div>
      ) : (
        <Loader />
      )}
      {gameDetails.msgError || gameDetails.name ? (
        <Link to="/videogames">
          <p className="backButton">ALL GAMES</p>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
