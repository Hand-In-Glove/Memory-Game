import React from "react";
import css from "./Square.module.css";

function Square({ id, compareSequence, illuminated }) {
  return (
    <div
      onClick={() => compareSequence(id)}
      className={illuminated ? css.animatedSquare : css.square}
    ></div>
  );
}

export default Square;
