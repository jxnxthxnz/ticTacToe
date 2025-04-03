import { useState } from 'react';

function Square({value, onSquareClick}) { {/* Square is a component, must start w caps, read in value prop */}
  return <button className="square" onClick={onSquareClick}>{value}</button>; {/*class name square is a prop */}
}

function Board({xIsNext, squares, onPlay}) { //export = use outside, default = main function

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return; {/* return early if something already there */}
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  }
  else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
 
  return (
    <>
      {/* create handleClick in board component, call it in sqaure to change board state */}
      <div className="status">{status}</div>
      <div className="board-row"> 
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> {/* pass in value prop to each Square component */}
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0; {/* figure out xIsNext from currentMove, dont use another state */}
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory); {/* adds nextSquares to a new array that has history 8*/ }
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  {/* squares is board state array and move is move index */}
  const moves = history.map((squares, move) => { {/* use .map to transform history of moves into buttons */}
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    }
    else {
      description = 'Go to game start';
    }
    return (
      <li key={move}> {/* use move number as key */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

{/* components use state to remember things */}
{/* each square has its own state */}
{/* use shared state in parent component, pass that state to child via props */}
{/* () => is an arrow function */}
{/* onSomething for props, handleSomething for handling events */}
{/* new top level game component and a history state */}
{/* use keys to maintain identity of list items, allows to maintain state */}
