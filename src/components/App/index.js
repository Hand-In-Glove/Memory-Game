import React, { useState, useEffect } from "react";

import "./App.css";
import Grid from "../Grid";

function App() {
  //array to hold grid locations
  const [gameBoard, setGameBoard] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  //state to hold number of rounds played
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  //array to hold randomly generated grid locations as game sequence
  const [gameSequence, setGameSequence] = useState([]);

  //state to hold number of locations to guess
  const [numberToGuess, setNumberToGuess] = useState(gameSequence.length);

  //state to hold the expected value for comparison
  const [expected, setExpected] = useState(null);

  useEffect(() => {
    setNumberToGuess(gameSequence.length - 1);
  }, [gameSequence]);

  useEffect(() => {
    setExpected(gameSequence[0]);
  }, [gameSequence]);

  //GAME LOGIC
  //function to add random grid location to gameSequence
  function addToGameSequence() {
    setGameSequence(
      [...gameSequence, gameBoard[Math.floor(Math.random() * gameBoard.length)]]
      // gameSequence.push(gameBoard[Math.floor(Math.random() * gameBoard.length)])
    );
  }

  //function to update all state for round
  function startRound() {
    setRoundsPlayed(roundsPlayed + 1);
    addToGameSequence();
    // setExpected(gameSequence[gameSequence.length - numberToGuess]);
  }
  //function to compare playerSequence with gameSequence
  function compareSequence(clicked) {
    setNumberToGuess(numberToGuess - 1);
    //if playerSequence matches gameSequence, run another gameSequence
    //if it does not match, display Try Again message below board
    if (clicked === expected) {
      setExpected(gameSequence[gameSequence.length - numberToGuess]);
      if (numberToGuess === 0) {
        alert("well done, matched");
        startRound();
      }
    } else {
      alert("Didn't match, Game Over");
    }
  }

  //how the flip do we animate this bleddy grid? - we need to loop over the gameSequence and for each item in array change the className for an interval

  return (
    <>
      <div className="App">
        <Grid gameBoard={gameBoard} compareSequence={compareSequence} />
        <h2>You have played {roundsPlayed} rounds!</h2>
      </div>
      <button
        style={{ display: "block", margin: "0 auto" }}
        onClick={() => {
          startRound();
        }}
      >
        Start Round
      </button>
    </>
  );
}

export default App;
