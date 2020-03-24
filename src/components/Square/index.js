import React from "react";
import css from "./Square.module.css";

function Square({ id, addToPlayerSequence }) {
  return (
    <div onClick={() => addToPlayerSequence(id)} className={css.square}></div>
  );
}

export default Square;
