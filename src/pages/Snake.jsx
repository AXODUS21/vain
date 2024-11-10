import React, { useEffect, useState } from "react";
import {
  randomIntFromInterval,
  reverseLinkedList,
  useInterval,
} from "../util/random.js";
import Button from "../components/Record.jsx";
import "../css/snake.css";
import Difficulty from "../components/Difficulty.jsx";
import CustomKeys from "../components/customKeys.jsx";

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}

const Direction = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT",
};

const BOARD_SIZE = 13;
const PROBABILITY_OF_DIRECTION_REVERSAL_FOOD = 0.3;

const getStartingSnakeLLValue = (board) => {
  const rowSize = board.length;
  const colSize = board[0].length;
  const startingRow = Math.round(rowSize / 3);
  const startingCol = Math.round(colSize / 3);
  const startingCell = board[startingRow][startingCol];
  return {
    row: startingRow,
    col: startingCol,
    cell: startingCell,
  };
};

const Snake = () => {
  const [score, setScore] = useState(0);
  const [isAutoMoving, setIsAutoMoving] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [directionFromPhone, setDirectionFromPhone] = useState("");
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("highScore")) || 0;
  });

  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [snake, setSnake] = useState(
    new LinkedList(getStartingSnakeLLValue(board))
  );
  const [snakeCells, setSnakeCells] = useState(
    new Set([snake.head.value.cell])
  );
  const [foodCell, setFoodCell] = useState(snake.head.value.cell + 5);
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [foodShouldReverseDirection, setFoodShouldReverseDirection] =
    useState(false);

   useEffect(() => {
     const handleKeydown = (e) => {
       const newDirection = getDirectionFromKey(e.key);
       const isValidDirection = newDirection !== "";
       if (!isValidDirection) return;
       const snakeWillRunIntoItself =
         getOppositeDirection(newDirection) === direction &&
         snakeCells.size > 1;
       if (snakeWillRunIntoItself) return;
       setDirection(newDirection);
     };

     // Add event listener for keyboard keys
     window.addEventListener("keydown", handleKeydown);

     // If direction from phone is set, update the direction state
     if (directionFromPhone) {
       const newDirection = getDirectionFromKey(directionFromPhone);
       const snakeWillRunIntoItself =
         getOppositeDirection(newDirection) === direction &&
         snakeCells.size > 1;
       if (!snakeWillRunIntoItself) {
         setDirection(newDirection);
       }
     }

     return () => {
       window.removeEventListener("keydown", handleKeydown);
     };
   }, [direction, snakeCells, directionFromPhone]);

  const toggleAutoMove = () => {
    setIsAutoMoving((prevIsAutoMoving) => !prevIsAutoMoving);
  };

  useInterval(() => {
    if (isAutoMoving) {
      moveSnake();
    }
  }, speed);

  const moveSnake = () => {
    const currentHeadCoords = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };

    const nextHeadCoords = getCoordsInDirection(currentHeadCoords, direction);
    if (isOutOfBounds(nextHeadCoords, board)) {
      handleGameOver();
      return;
    }
    const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];
    if (snakeCells.has(nextHeadCell)) {
      handleGameOver();
      return;
    }

    const newHead = new LinkedListNode({
      row: nextHeadCoords.row,
      col: nextHeadCoords.col,
      cell: nextHeadCell,
    });
    const currentHead = snake.head;
    snake.head = newHead;
    currentHead.next = newHead;

    const newSnakeCells = new Set(snakeCells);
    newSnakeCells.delete(snake.tail.value.cell);
    newSnakeCells.add(nextHeadCell);

    snake.tail = snake.tail.next;
    if (snake.tail === null) snake.tail = snake.head;

    const foodConsumed = nextHeadCell === foodCell;
    if (foodConsumed) {
      growSnake(newSnakeCells);
      if (foodShouldReverseDirection) reverseSnake();
      handleFoodConsumption(newSnakeCells);
    }

    setSnakeCells(newSnakeCells);
  };

  const growSnake = (newSnakeCells) => {
    const growthNodeCoords = getGrowthNodeCoords(snake.tail, direction);
    if (isOutOfBounds(growthNodeCoords, board)) {
      return;
    }
    const newTailCell = board[growthNodeCoords.row][growthNodeCoords.col];
    const newTail = new LinkedListNode({
      row: growthNodeCoords.row,
      col: growthNodeCoords.col,
      cell: newTailCell,
    });
    const currentTail = snake.tail;
    snake.tail = newTail;
    snake.tail.next = currentTail;

    newSnakeCells.add(newTailCell);
  };

  const reverseSnake = () => {
    const tailNextNodeDirection = getNextNodeDirection(snake.tail, direction);
    const newDirection = getOppositeDirection(tailNextNodeDirection);
    setDirection(newDirection);

    reverseLinkedList(snake.tail);
    const snakeHead = snake.head;
    snake.head = snake.tail;
    snake.tail = snakeHead;
  };

  const handleFoodConsumption = (newSnakeCells) => {
    const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE;
    let nextFoodCell;
    while (true) {
      nextFoodCell = randomIntFromInterval(1, maxPossibleCellValue);
      if (newSnakeCells.has(nextFoodCell) || foodCell === nextFoodCell)
        continue;
      break;
    }

    const nextFoodShouldReverseDirection =
      Math.random() < PROBABILITY_OF_DIRECTION_REVERSAL_FOOD;

    setFoodCell(nextFoodCell);
    setFoodShouldReverseDirection(nextFoodShouldReverseDirection);
    setScore(score + 1);
  };

  const handleGameOver = () => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
    setScore(0);
    const snakeLLStartingValue = getStartingSnakeLLValue(board);
    setSnake(new LinkedList(snakeLLStartingValue));
    setFoodCell(snakeLLStartingValue.cell + 5);
    setSnakeCells(new Set([snakeLLStartingValue.cell]));
    setDirection(Direction.RIGHT);
  };

  return (
    <>
      <div className="board">
        <CustomKeys
          setDirectionFromPhone={setDirectionFromPhone}
          containerStyles={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            zIndex: "100",
          }}
        />
        <Button
          specialStyle={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: "100",
          }}
        />

        <div
          className="snake-difficulty"
          style={{
            position: "absolute",
            top: `30%`,
            left: `20px`,
            display: `grid`,
            gap: `20px`,
          }}
        >
          <Difficulty
            strokeColor1={`#4bff3b`}
            strokeColor2={`pink`}
            title={"Easy"}
            handleSetDifficulty={() => setSpeed(500)}
          />
          <Difficulty
            strokeColor1={`orange`}
            strokeColor2={`blue`}
            title={"Normal"}
            handleSetDifficulty={() => setSpeed(150)}
          />
          <Difficulty
            strokeColor1={`yellow`}
            strokeColor2={`red`}
            title={"Difficult"}
            handleSetDifficulty={() => setSpeed(100)}
          />
          <Difficulty
            strokeColor1={`black`}
            strokeColor2={`red`}
            title={"Impossible"}
            handleSetDifficulty={() => setSpeed(50)}
          />
        </div>
        <div className="scores">
          <h1>Score: {score}</h1>
          <h1>High Score: {highScore}</h1>
        </div>
        <button
          className="ui-btn"
          onClick={toggleAutoMove}
          style={{ position: "absolute", bottom: "50%", right: "50px" }}
        >
          <span>{isAutoMoving ? "Stop" : "Start"}</span>
        </button>

        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((cellValue, cellIdx) => {
              const className = getCellClassName(
                cellValue,
                foodCell,
                foodShouldReverseDirection,
                snakeCells
              );
              return <div key={cellIdx} className={className}></div>;
            })}
          </div>
        ))}
      </div>
    </>
  );
};

const createBoard = (BOARD_SIZE) => {
  let counter = 1;
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentRow = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
};

const getCellClassName = (
  cellValue,
  foodCell,
  foodShouldReverseDirection,
  snakeCells
) => {
  let className = "cell";
  if (cellValue === foodCell) {
    if (foodShouldReverseDirection) {
      className = "cell cell-purple";
    } else {
      className = "cell cell-red";
    }
  }
  if (snakeCells.has(cellValue)) className = "cell cell-green";

  return className;
};

const getDirectionFromKey = (key) => {
  if (key === "ArrowUp") return Direction.UP;
  if (key === "ArrowRight") return Direction.RIGHT;
  if (key === "ArrowDown") return Direction.DOWN;
  if (key === "ArrowLeft") return Direction.LEFT;
  return "";
};

const getOppositeDirection = (direction) => {
  if (direction === Direction.UP) return Direction.DOWN;
  if (direction === Direction.RIGHT) return Direction.LEFT;
  if (direction === Direction.DOWN) return Direction.UP;
  if (direction === Direction.LEFT) return Direction.RIGHT;
};

const getCoordsInDirection = (coords, direction) => {
  if (direction === Direction.UP) {
    return { row: coords.row - 1, col: coords.col };
  }
  if (direction === Direction.RIGHT) {
    return { row: coords.row, col: coords.col + 1 };
  }
  if (direction === Direction.DOWN) {
    return { row: coords.row + 1, col: coords.col };
  }
  if (direction === Direction.LEFT) {
    return { row: coords.row, col: coords.col - 1 };
  }
};

const isOutOfBounds = (coords, board) => {
  const { row, col } = coords;
  if (row < 0 || col < 0) return true;
  if (row >= board.length || col >= board[0].length) return true;
  return false;
};

const getGrowthNodeCoords = (snakeTail, direction) => {
  const tailNextNodeDirection = getNextNodeDirection(snakeTail, direction);
  const growthDirection = getOppositeDirection(tailNextNodeDirection);
  return getCoordsInDirection(
    { row: snakeTail.value.row, col: snakeTail.value.col },
    growthDirection
  );
};

const getNextNodeDirection = (node, currentDirection) => {
  if (node.next === null) return currentDirection;
  const { row: currentRow, col: currentCol } = node.value;
  const { row: nextRow, col: nextCol } = node.next.value;

  if (nextRow === currentRow && nextCol === currentCol + 1)
    return Direction.RIGHT;
  if (nextRow === currentRow && nextCol === currentCol - 1)
    return Direction.LEFT;
  if (nextCol === currentCol && nextRow === currentRow + 1)
    return Direction.DOWN;
  if (nextCol === currentCol && nextRow === currentRow - 1) return Direction.UP;
};

export default Snake;
