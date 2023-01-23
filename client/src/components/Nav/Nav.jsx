import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="container">
      <Link className="linkInitial link" to="/">
        Landing Page
      </Link>
      <Link className="linkHome link" to="/videogames">
        Home
      </Link>
      <Link className="linkCreate link" to="/videogames/create">
        Add Game
      </Link>
    </div>
  );
}
