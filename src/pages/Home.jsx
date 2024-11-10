import React from 'react'
import Button from '../components/Record'
import Typewriter from "typewriter-effect"
import "../css/home.css"

const Home = () => {
  return (
    <div className="home-container">
      <h1>Issue A Command!</h1>
      <Button />
      <h3>
        <Typewriter
          options={{
            strings: ['"open calculator"', '"open diary"', '"open to do list"', '"open rps"', '"open snake"'],
            autoStart: true,
            loop: true,
          }}
        />
      </h3>
    </div>
  );
}

export default Home