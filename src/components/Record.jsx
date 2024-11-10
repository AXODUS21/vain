"use client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Mic from "./mic";

function Button({specialStyle}) {
  const keywords = ["open calculator", "open diary", "open to do list", "open rps", "open snake", "home", "open assistant"]
  const [isRecording, setIsRecording] = useState(false)
  const navigate = useNavigate();

  
const handleOnRecord = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.onstart = () => {
    console.log("Recording started.");
    setIsRecording(true);
  };

  recognition.onerror = (event) => {
    alert(event.error);
  };

  recognition.onend = () => {
    console.log("Recording stopped.");
    setIsRecording(false);
  };

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
    handleTeleport(transcript);
  };

  recognition.start();
};
  const handleTeleport = (transcript) => {
    for (let i = 0; i < keywords.length; i++) {
      if(transcript === keywords[i]) {
        console.log("Opening...")
        navigate(`/${keywords[i]}`)
      } 
    }
  };
  return (
    <div className="record-container" style={specialStyle}>
      <div onClick={handleOnRecord} className="record-button">
        <Mic isRecording={isRecording}/>
      </div>
    </div>
  );
}

export default Button;
