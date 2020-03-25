import React from "react";
import css from "./Square.module.css";

function Square({ id, compareSequence }) {
  return <div onClick={() => compareSequence(id)} className={css.square}></div>;
}

export default Square;
