import React, { useState } from "react";
import rock from "../assets/rps/rock.jpg"
import paper from "../assets/rps/paper.jpg"
import scissors from "../assets/rps/scissors.jpg"
import "../css/rps.css"
import Button from "../components/Record";

const RPS = () => {
  const choices = ["rock", "paper", "scissors"];
  const [botChoice, setBotChoice] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({
    user: 0,
    bot: 0,
  });

  const handleChoice = (choice) => {
    setUserChoice(choice);
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    setBotChoice(botChoice);

    const userIndex = choices.indexOf(choice);
    const botIndex = choices.indexOf(botChoice);

    if (userIndex === botIndex) {
      setResult("It's a tie!");
    } else if (
      (userIndex === 0 && botIndex === 2) ||
      (userIndex === 1 && botIndex === 0) ||
      (userIndex === 2 && botIndex === 1)
    ) {
      setResult("You win!");
      setScore((prevScore) => ({...prevScore, user: prevScore.user + 1 }));
    } else {
      setResult("You lose!");
      setScore((prevScore) => ({...prevScore, bot: prevScore.bot + 1 }));
    }
  };

  return (
    <div className="rps-container">
      <Button
        specialStyle={{ position: "absolute", top: "10px", left: "10px" }}
      />
      <h1>Rock-Paper-Scissors Game</h1>
      <div className="choices-container">
        <button onClick={() => handleChoice("rock")}>
          <img className="rps-choices" src={rock} />
        </button>
        <button onClick={() => handleChoice("paper")}>
          <img className="rps-choices" src={paper} />
        </button>
        <button onClick={() => handleChoice("scissors")}>
          <img className="rps-choices" src={scissors} />
        </button>
      </div>
      <div>
        <h2>Your Choice: {userChoice}</h2>
        <h2>Bot's Choice: {botChoice}</h2>
        <h2>Result: {result}</h2>
        <h2>
          <span style={{color: 'green'}}>You: {score.user} </span> <span style={{color: 'red'}}>Bot: {score.bot}</span>
        </h2>
      </div>
    </div>
  );
};

export default RPS;
