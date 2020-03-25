import React from "react";
import Square from "../Square";
import css from "./Grid.module.css";

//component to render grid out of individual square components

function Grid({ gameBoard, addToPlayerSequence }) {
  return (
    <div className={css.grid}>
      {gameBoard.map(item => (
        <Square addToPlayerSequence={addToPlayerSequence} id={item} />
      ))}
    </div>
  );
}

export default Grid;
