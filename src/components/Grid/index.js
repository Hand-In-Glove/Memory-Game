import React from "react";
import Square from "../Square";
import css from "./Grid.module.css";

function Grid({ gameBoard }) {
  return (
    <div className={css.grid}>
      {gameBoard.map(item => (
        <Square />
      ))}
    </div>
  );
}

export default Grid;
