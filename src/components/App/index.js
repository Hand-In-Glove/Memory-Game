import React, { useState, useEffect } from "react";

import "./App.css";
import Grid from "../Grid";

// const defaultHardGrid = new Array(9);
// defaultHardGrid.fill({ illuminated: false });

// const defaultEasyGrid = new Array(4);
// defaultEasyGrid.fill({ illuminated: false });

//easy grid x3
const easy = new Array(3);
easy.fill({ illuminated: false, level: "easy" });
//medium grid 3x3
const medium = new Array(9);
medium.fill({ illuminated: false, level: "medium" });
//hard grid 3x4
const hard = new Array(12);
hard.fill({ illuminated: false, level: "hard" });
//insane grid 4x4
const insane = new Array(16);
insane.fill({ illuminated: false, level: "insane" });

function App() {
  //array to hold grid locations - starts on hard by default
  const [gameBoard, setGameBoard] = useState(medium);

  //state to hold number of rounds played
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  //array to hold randomly generated grid locations as game sequence
  const [gameSequence, setGameSequence] = useState([
    Math.floor(Math.random() * gameBoard.length)
  ]);

  //state to hold number of locations to guess
  const [numberToGuess, setNumberToGuess] = useState(gameSequence.length);

  //state to hold the expected value for comparison
  const [expected, setExpected] = useState(null);

  //state to display if guess was correct or not
  const [result, setResult] = useState("");

  //state to hold game difficulty, number of playable grid locations is dependent on this state
  const [diff, setDiff] = useState("medium");

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setNumberToGuess(gameSequence.length - 1);
    setExpected(gameSequence[0]);
  }, [gameSequence]);

  useEffect(() => {
    if (diff === "medium") {
      setGameBoard(medium);
    } else if (diff === "easy") {
      setGameBoard(easy);
    } else if (diff === "hard") {
      setGameBoard(hard);
    } else if (diff === "insane") {
      setGameBoard(insane);
    }
  }, [diff]);

  //GAME LOGIC
  //function to toggle game difficulty
  // function changeDifficulty() {
  //   if (diff === "hard") {
  //     setDiff("easy");
  //   } else if (diff === "easy") {
  //     setDiff("hard");
  //   }
  // }

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
        illuminateSquare(item, i);
      }, 1000 * i);
    });
  }

  function resetGame() {
    setDiff("medium");
    setGameBoard(medium);
    setRoundsPlayed(0);
    setGameSequence([Math.floor(Math.random() * gameBoard.length)]);
    setExpected(null);
    setIsGameOver(!isGameOver);
    setResult("");
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
        setResult("well done, matched");
        setTimeout(() => {
          startRound();
        }, 1000);
      }
    } else {
      setResult("Didn't match, Game Over");
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
    setTimeout(() => {
      switchOff(index);
    }, 500);
  }

  //how the flip do we animate this bleddy grid? - we need to loop over the gameSequence and for each item in array change the className for an interval
  // this function re renders the gameBoard each time the id of the square passed to it changes.
  // the id changes as we loop through the array gameSequence
  // the function needs to set the className to css.animatedSquare
  // and back again

  // This uses the index of the square
  function illuminateSquare(index, i) {
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
    setTimeout(() => {
      switchOff(index);
    }, 500);
  }

  function switchOff(index) {
    const pattern = [
      ...gameBoard.slice(0, index),
      {
        ...gameBoard[index],
        illuminated: false
      },
      ...gameBoard.slice(index + 1)
    ];
    setGameBoard(pattern);
  }

  return (
    <>
      <div className="App">
        <h1>Simon!</h1>
        <Grid
          gameBoard={gameBoard}
          compareSequence={compareSequence}
          diff={diff}
        />
        <h2 className="score">
          score:{roundsPlayed > 0 && <h2>{roundsPlayed - 1} </h2>}
        </h2>
        <button onClick={() => setDiff("easy")} className="level easy">
          Easy
        </button>
        <button onClick={() => setDiff("medium")} className="level medium">
          Medium
        </button>
        <button onClick={() => setDiff("hard")} className="level hard">
          Hard
        </button>
        <h2 className="alert">{result}</h2>
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
