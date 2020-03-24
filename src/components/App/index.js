import React from "react";
import "./App.css";
import Grid from "../Grid";

const gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  return (
    <div className="App">
      <Grid gameBoard={gameBoard} />
    </div>
  );
}

export default App;
