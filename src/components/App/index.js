import React, { useState, useEffect } from "react";

import "./App.css";
import Grid from "../Grid";

function App() {
  //array to hold grid locations
  const [gameBoard, setGameBoard] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  //array to hold randomly generated grid locations as game sequence
  const [gameSequence, setGameSequence] = useState([]);

  //array to hold player selections
  const [playerSequence, setPlayerSequence] = useState([]);

  //GAME LOGIC
  //function to add random grid location to gameSequence
  function addToGameSequence() {
    setGameSequence(
      [...gameSequence, gameBoard[Math.floor(Math.random() * gameBoard.length)]]
      // gameSequence.push(gameBoard[Math.floor(Math.random() * gameBoard.length)])
    );
  }

  //function to add clicked square to playerSequence array
  function addToPlayerSequence(id) {
    setPlayerSequence([...playerSequence, id]);
  }

  //function to compare playerSequence with gameSequence
  function compareSequence() {
    //if playerSequence matches gameSequence, run another gameSequence
    //if it does not match, display Try Again message below board
    if (playerSequence === gameSequence) {
      alert("well done, matched");
      addToGameSequence();
    }
    alert("Didn't match, Game Over");
  }

  //how the flip do we animate this bleddy grid? - we need to loop over the gameSequence and for each item in array change the className for an interval

  return (
    <>
      <div className="App">
        <Grid gameBoard={gameBoard} addToPlayerSequence={addToPlayerSequence} />
      </div>
      <button
        style={{ display: "block", margin: "0 auto" }}
        onClick={addToGameSequence}
      >
        Start Game
      </button>
    </>
  );
}

export default App;
