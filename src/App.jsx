"use client"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import Calculator from "./pages/Calculator"
import Diary from "./pages/Diary"
import RPS from "./pages/RPS"
import Snake from "./pages/Snake"
import TodoList from "./pages/TodoList"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/open calculator" element={<Calculator />} />
        <Route path="/open diary" element={<Diary />} />
        <Route path="/open rps" element={<RPS />} />
        <Route path="/open snake" element={<Snake />} />
        <Route path="/open to do list" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App
