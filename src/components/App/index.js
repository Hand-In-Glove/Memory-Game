import React from "react";
import "./App.css";
import Grid from "../Grid";
//array to hold grid locations
const gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//array to hold randomly genereated grid locations as game sequence
const gameSequence = [];

//function to add random grid location to gameSequence
function generateGameSequence() {
  gameSequence.push(gameBoard[Math.floor(Math.random() * gameBoard.length)]);
  console.log(gameSequence);
}

//array to hold player selections
const playerSequence = [];

//function to add clicked square to playerSequence array
function addToPlayerSequence(id) {
  playerSequence.push(id);
  console.log(playerSequence);
}

function App() {
  return (
    <div className="App">
      <Grid gameBoard={gameBoard} addToPlayerSequence={addToPlayerSequence} />
      <button onClick={generateGameSequence}>Click</button>
    </div>
  );
}

export default App;
