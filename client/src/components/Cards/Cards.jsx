import React from "react";
import { connect } from "react-redux";
import { getGames } from "../../redux/actions";
import Card from "../Card/Card";
import "./Cards.css";

class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getGames();
  }

  render() {
    return (
      <div className="cardsContainer">
        {this.props.games.map((game) => {
          return (
            <Card
              name={game.name}
              rating={game.rating}
              genres={game.genres}
              background_image={game.background_image}
              key={game.name}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
  };
};

//Crea funciones que puedan hacer dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    getGames: () => dispatch(getGames()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
