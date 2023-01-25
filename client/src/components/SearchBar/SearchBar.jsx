import "./SearchBar.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getGames, resetGames } from "../../redux/actions";

export default function SearchBar() {
  // const { filtersApplied, games } = useSelector((state) => state);
  const [input, setInput] = useState("");
  let dispatch = useDispatch();

  function onChange(e) {
    setInput(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (input.length > 0) {
      dispatch(resetGames());
      dispatch(getGames(input));
      setInput("");
    } else {
      alert("Must write something to search");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        value={input}
        onChange={onChange}
        name="game"
        type="text"
        placeholder="Search a videogame"
      ></input>
      <button type="submit">Search...</button>
    </form>
  );
}

// export default searchBar;
