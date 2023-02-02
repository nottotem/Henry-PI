import "./Paginated.css";
import React from "react";
import { useSelector } from "react-redux";

const Paginated = ({ paginated, gamesPerPage, games, next, previous }) => {
  const { currentPage } = useSelector((state) => state);
  //Cantidad de paginas que va a tener
  const pages = [];

  for (let i = 1; i <= Math.ceil(games / gamesPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagContainer">
      {pages.length ? (
        <div className="buttonContainer">
          <button className="pButton" onClick={() => previous()}>
            Previous
          </button>
          {pages.map((page) => (
            <button
              className={
                currentPage === page ? `numButton currentButton` : `numButton`
              }
              onClick={() => paginated(page)}
              key={page}
            >
              {page}
            </button>
          ))}
          <button className="nButton" onClick={() => next()}>
            Next
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Paginated;
