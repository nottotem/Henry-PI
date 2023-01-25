import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getGameDetails, resetGameDetail } from "../../redux/actions";
import "./GameDetails.css";
import Loader from "../Loader/Loader";
import Warning from "../Warning/Warning";
// import { AiFillStar } from "react-icons/ai";

export default function Details() {
  let gameDetails = useSelector((state) => state.gameDetail);
  let dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getGameDetails(id));
    return dispatch(resetGameDetail());
  }, [id, dispatch]);

  const {
    name,
    background_image,
    genres,
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
              <p className="detailRating">
                {/* <AiFillStar /> */}
                {rating}
              </p>
            </div>
            <h1 className="detailName">{name}</h1>
            <div className="detailCenter">
              <div className="detailsGroup">
                <div className="detailGenres">
                  <span>Géneros:</span>
                  <p>{genres.map((g) => ` | ${g} | `)}</p>
                </div>
                <div className="detailPlatforms">
                  <span>Plataformas:</span>{" "}
                  {platforms.map((p) => ` | ${p} |  `)}
                </div>
                <p className="detailDescription">
                  <span>Descripción:</span> {description.slice(0, 1500)}
                </p>
              </div>
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
