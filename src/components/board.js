import styles from "./board.module.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
    return (
        <button className={`${styles.square}`} onClick={onSquareClick}>
            {value}
        </button>
    );
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
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

function Board({ xIsNext, squares, onPlay }) {
    // Helpers
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    let board_rows = [];
    for (let i = 0; i < 3; i++) {
        let offset = i * 3; // 0, 3, 6

        // Cells
        let cells = [];
        for (let j = 0; j < 3; j++) {
            let index = offset + j;
            cells.push(
                <Square
                    value={squares[index]}
                    onSquareClick={() => handleClick(index)}
                    key={index}
                />
            );
        }

        // Board
        board_rows.push(
            <div key={i} className={`${styles["board-row"]}`}>
                {cells}
            </div>
        );
    }

    // Return the board component
    return <>{board_rows}</>;
}

export default function Game() {
    // Game play states
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    // Check winner
    const winner = calculateWinner(currentSquares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    // Helpers
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = "Go to move #" + move;
        } else {
            description = "Go to game start";
        }
        return (
            <li key={move} className={`${styles["move-record"]}`}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    // Game component
    return (
        <div className={`${styles["game"]}`}>
            <div className={`${styles["container"]}`}>
                <div className={`${styles["game-status"]}`}>{status}</div>
                <div className={`${styles["game-board"]}`}>
                    <Board
                        xIsNext={xIsNext}
                        squares={currentSquares}
                        onPlay={handlePlay}
                    />
                </div>
                <div className={`${styles["game-info"]}`}>
                    <div>History</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        </div>
    );
}
