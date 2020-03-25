import React from "react";
import Square from "../Square";
import css from "./Grid.module.css";

//component to render grid out of individual square components

function Grid({ gameBoard, compareSequence }) {
  return (
    <div className={css.grid}>
      {gameBoard.map(item => (
        <Square compareSequence={compareSequence} id={item} />
      ))}
    </div>
  );
}

export default Grid;
