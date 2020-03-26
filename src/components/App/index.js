import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

import "./App.css";
import Grid from "../Grid";

function App() {
  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1
  });

  //array to hold grid locations
  const [gameBoard, setGameBoard] = useState([
    { illuminated: false },
    { illuminated: false },
    { illuminated: false },
    { illuminated: false },
    { illuminated: false },
    { illuminated: false },
    { illuminated: false },
    { illuminated: false },
    { illuminated: false }
  ]);

  //state to hold number of rounds played
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  //array to hold randomly generated grid locations as game sequence
  const [gameSequence, setGameSequence] = useState([4]);

  //state to hold number of locations to guess
  const [numberToGuess, setNumberToGuess] = useState(gameSequence.length);

  //state to hold the expected value for comparison
  const [expected, setExpected] = useState(null);

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setNumberToGuess(gameSequence.length - 1);
    setExpected(gameSequence[0]);
  }, [gameSequence]);

  //GAME LOGIC
  //function to add random grid location to gameSequence

  function addToGameSequence() {
    setGameSequence(
      [...gameSequence, Math.floor(Math.random() * gameBoard.length)]

      // gameSequence.push(gameBoard[Math.floor(Math.random() * gameBoard.length)])
    );
  }

  //function to update all state for round
  function startRound() {
    setRoundsPlayed(roundsPlayed + 1);
    addToGameSequence();
    gameSequence.map((item, i) => {
      setTimeout(() => {
        illuminateSquare(item);
      }, 1000 * i);
    });
  }

  function resetGame() {
    setRoundsPlayed(0);
    setGameSequence([4]);
    setExpected(null);
    setIsGameOver(!isGameOver);
  }

  //function to compare playerSequence with gameSequence
  function compareSequence(clicked) {
    illuminatePlayerSquare(clicked);
    setNumberToGuess(numberToGuess - 1);
    //if playerSequence matches gameSequence, run another gameSequence
    //if it does not match, display Try Again message below board
    if (clicked === expected) {
      setExpected(gameSequence[gameSequence.length - numberToGuess]);
      if (numberToGuess === 1) {
        alert("well done, matched");
        startRound();
      }
    } else {
      alert("Didn't match, Game Over");
      setIsGameOver(!isGameOver);
    }
  }

  function illuminatePlayerSquare(index) {
    const pattern = [
      ...gameBoard.slice(0, index),
      {
        ...gameBoard[index],
        illuminated: true
      },
      ...gameBoard.slice(index + 1)
    ];
    setGameBoard(pattern);
    console.log(pattern);
  }

  //how the flip do we animate this bleddy grid? - we need to loop over the gameSequence and for each item in array change the className for an interval
  // this function re renders the gameBoard each time the id of the square passed to it changes.
  // the id changes as we loop through the array gameSequence
  // the function needs to set the className to css.animatedSquare
  // and back again

  // This uses the index of the square
  function illuminateSquare(index) {
    const pattern = [
      ...gameBoard.slice(0, index),
      {
        ...gameBoard[index],
        illuminated: true
      },
      ...gameBoard.slice(index + 1)
    ];
    setGameBoard(pattern);
    console.log(pattern);
  }

  //turn it off again?
  // function deIlluminateSquare(index) {
  //   const pattern = [
  //     ...gameBoard.slice(0, index),
  //     {
  //       ...gameBoard[index],
  //       illuminated: false
  //     },
  //     ...gameBoard.slice(index + 1)
  //   ];
  //   setGameBoard(pattern);
  //   console.log(pattern);
  // }

  return (
    <>
      <div className="App">
        <animated.h1 style={fade}>Simon!</animated.h1>
        <Grid gameBoard={gameBoard} compareSequence={compareSequence} />
        <h2>score:{roundsPlayed > 0 && <h2>{roundsPlayed - 1} </h2>}</h2>

        {roundsPlayed === 0 && (
          <button
            style={{ display: "block", margin: "0 auto" }}
            onClick={() => {
              startRound();
            }}
          >
            Play!
          </button>
        )}
        {isGameOver && (
          <button
            style={{ display: "block", margin: "0 auto" }}
            onClick={() => {
              resetGame();
            }}
          >
            Go again!
          </button>
        )}
      </div>
    </>
  );
}

export default App;
