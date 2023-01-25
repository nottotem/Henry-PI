import React from "react";
import { useDispatch } from "react-redux";
import { getGames, resetGames } from "../../redux/actions";
import "./RefreshCards.css";

export default function CardsRecharge() {
  let dispatch = useDispatch();

  function handleClick(event) {
    event.preventDefault();
    dispatch(resetGames());
    dispatch(getGames());
  }

  return (
    <button className="refreshButton" onClick={handleClick}>
      Refresh games & filters
    </button>
  );
}
