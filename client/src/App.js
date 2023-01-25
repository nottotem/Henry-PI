import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Inicio from "./components/Inicio/Inicio";
import Nav from "./components/Nav/Nav";
import GameDetails from "./components/GameDetails/GameDetails";

function App() {
  return (
    <div className="App">
      <Route path="/videogames" component={Nav} />
      <Route path="/" exact component={Inicio} />
      <Route path="/videogames" exact component={Home} />
      {/* <Route path="/videogames/create" exact component={Create} /> */}
      <Route path="/videogames/detail/:id" exact component={GameDetails} />
    </div>
  );
}

export default App;
