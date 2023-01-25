import React from "react";
import "./Card.css";
import { AiFillStar } from "react-icons/ai";

const Card = ({ name, genres, rating, background_image }) => {
  return (
    <div className="card">
      <img src={background_image} alt="game_image" className="card_image" />
      <div className="div_text">
        <span className="card_rating">
          <AiFillStar className="star" />
          <span>{rating} / 5</span>
          <AiFillStar className="star" />
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
