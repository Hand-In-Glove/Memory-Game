import React from "react";
import Square from "../Square";
import css from "./Grid.module.css";

//component to render grid out of individual square components

//each square is identified by an id of 1-9
//select the square to highlight by passing an id to it Square(id)
//

function Grid({ gameBoard, compareSequence, diff }) {
  return (
    <div
      className={
        (diff === "medium" && css.gridMedium) ||
        (diff === "easy" && css.gridEasy) ||
        (diff === "hard" && css.gridHard)
      }
    >
      {gameBoard.map((item, index) => (
        <Square
          compareSequence={compareSequence}
          id={index}
          illuminated={item.illuminated}
        />
      ))}
    </div>
  );
}

export default Grid;
