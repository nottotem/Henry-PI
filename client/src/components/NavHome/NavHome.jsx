import React from "react";
import RefreshCards from "../RefreshCards/RefrashCards";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import "./NavHome.css";

export default function NavHome() {
  return (
    <div className="navHomeContainer">
      <RefreshCards />
      <SearchBar />
      <Filters />
    </div>
  );
}
