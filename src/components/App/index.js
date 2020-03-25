import React, { useState, useEffect } from "react";
import "./App.css";
import Grid from "../Grid";

function App() {
  //array to hold grid locations
  const [gameBoard, setGameBoard] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  //array to hold randomly generated grid locations as game sequence
  const [gameSequence, setGameSequence] = useState([]);

  //function to add random grid location to gameSequence
  function generateGameSequence() {
    setGameSequence(
      [...gameSequence, gameBoard[Math.floor(Math.random() * gameBoard.length)]]
      // gameSequence.push(gameBoard[Math.floor(Math.random() * gameBoard.length)])
    );
    console.log(gameSequence);
  }

  //array to hold player selections
  const [playerSequence, setPlayerSequence] = useState([]);

  //function to add clicked square to playerSequence array
  function addToPlayerSequence(id) {
    setPlayerSequence([...playerSequence, id]);
    console.log(playerSequence);
    compareSequence();
  }

  //function to compare playerSequence with gameSequence
  function compareSequence() {
    //if playerSequence matches gameSequence, run another gameSequence
    //if it does not match, display Try Again message below board
    const result =
      playerSequence === gameSequence
        ? console.log("matched")
        : console.log("game over");

    return result;
  }

  //how the flip do we animate this bleddy grid? - we need to loop over the gameSequence and for each item in array change the className for an interval

  return (
    <div className="App">
      <Grid gameBoard={gameBoard} addToPlayerSequence={addToPlayerSequence} />
      <button onClick={generateGameSequence}>Click</button>
    </div>
  );
}

export default App;
