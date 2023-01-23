import React from "react";
import "./Card.css";
import { AiFillFire } from "react-icons/ai";

const Card = ({ name, genres, rating, background_image }) => {
  return (
    // <div className="cardContainer">
    //   <div>
    //     <div>
    //       <h4 className="nameCard">{name}</h4>
    //     </div>
    //     <div className="ratingCard">
    //       <p>{rating}</p>
    //     </div>
    //     <div className="genresCard">
    // {genres
    //   ? genres.map((genre) => {
    //       return <p key={genres.indexOf(genre)}>{genre}</p>;
    //     })
    //   : ""}
    //     </div>
    //   </div>
    //   <img src={background_image} alt="Imagen" className="imgContainer" />
    // </div>
    <div className="card">
      <img src={background_image} alt="game_image" className="card_image" />
      <div className="div_text">
        <span className="card_rating">
          <AiFillFire className="fuego" />
          <AiFillFire className="fuego" />
          <AiFillFire className="fuego" /> <span>{rating} / 5</span>
        </span>
        <h2 className="card_name">{name}</h2>
        <div className="card_genres">
          {genres
            ? genres.map((genre) => {
                return <p key={genres.indexOf(genre)}>{genre}</p>;
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Card;
