import React from "react";
import RefreshCards from "../RefreshCards/RefrashCards";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import "./NavHome.css";

export default function NavHome() {
  return (
    <div className="navHomeContainer">
      <div className="navHome">
        <RefreshCards />
      </div>
      <div className="navHome">
        <Filters />
      </div>
      <div className="navHome">
        <SearchBar />
      </div>
    </div>
  );
}
