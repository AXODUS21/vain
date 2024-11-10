import React, { useState } from 'react'
import "../css/calculator.css"
import Button from '../components/Record'

const Calculator = () => {
  const [numsToSolve, setNumsToSolve] = useState("")
  const [result, setResult] = useState(null)

  const handleNumber = (num) => {
    console.log(num)
    setNumsToSolve(numsToSolve + num)
  }

  const handleEqual = () => {
    console.log("solve")
    console.log(numsToSolve)
    const equation = numsToSolve.replace(/(\d)(\()/g, "$1*(");
    try {
      const computedResult = eval(equation)
      setResult(computedResult)
      setNumsToSolve("")
    } catch (error) {
      setResult("Error: Invalid equation")
    }
  }

  const handleDelete = () => {
    setNumsToSolve(numsToSolve.slice(0, -1))
  }

  const handleClear = () => {
    setNumsToSolve("");
    setResult(null);
  }


  return (
    <div className="calc-container">
      <Button
        specialStyle={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: "100",
        }}
      />
      {/* !Calc is just short for calculator chat, I'm just using slang*/}
      <div className="calculator">
        <div className="text-input">{numsToSolve || result || 0}</div>

        <div className="calc-button-container">
          <div className="numbers">
            <button
              onClick={() => {
                handleNumber("(");
              }}
            >
              {" "}
              <span className="button_top">(</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber(")");
              }}
            >
              <span className="button_top">)</span>{" "}
            </button>
            <button onClick={handleDelete} onDoubleClick={handleClear}>
              <span className="button_top">C</span>{" "}
            </button>

            <button
              onClick={() => {
                handleNumber("7");
              }}
            >
              {" "}
              <span className="button_top">7</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("8");
              }}
            >
              {" "}
              <span className="button_top">8</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("9");
              }}
            >
              {" "}
              <span className="button_top">9</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("4");
              }}
            >
              {" "}
              <span className="button_top">4</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("5");
              }}
            >
              {" "}
              <span className="button_top">5</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("6");
              }}
            >
              {" "}
              <span className="button_top">6</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("1");
              }}
            >
              {" "}
              <span className="button_top">1</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("2");
              }}
            >
              {" "}
              <span className="button_top">2</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("3");
              }}
            >
              {" "}
              <span className="button_top">3</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("0");
              }}
            >
              {" "}
              <span className="button_top">0</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber(".");
              }}
            >
              {" "}
              <span className="button_top">.</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("3.14");
              }}
            >
              <span className="button_top">π</span>{" "}
            </button>
          </div>
          <div className="operators">
            <button
              onClick={() => {
                handleNumber("+");
              }}
            >
              <span className="button_top">+</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("-");
              }}
            >
              <span className="button_top">-</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("*");
              }}
            >
              <span className="button_top">X</span>{" "}
            </button>
            <button
              onClick={() => {
                handleNumber("/");
              }}
            >
              <span className="button_top">/</span>{" "}
            </button>
            <button onClick={handleEqual}>
              <span className="button_top">=</span>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator