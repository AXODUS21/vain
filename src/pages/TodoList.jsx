import React, { useEffect, useState } from "react";
import "../css/todo.css";
import Button from "../components/Record";
import Delete from "../components/delete";
import Checkbox from "../components/checkbox";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [dueDateDays, setDueDate] = useState("");
  const [subject, setSubject] = useState("none");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handlePriority = (task) => {
    if (task.dueDateDays <= 2) {
      return "red";
    } else if (task.dueDateDays <= 4) {
      return "yellow";
    } else {
      return "green";
    }
  };

  // TODO: when connected to a server make this interval fun once a day if not possible with the current circumstances use an API or a library that can
  // handle the work load
  
  // setInterval(() => {
  //   handleReduceADay()
  // }, 3009)

  const handleReduceADay = () => {
    const updatedTasks = tasks.map((task) => {
      if (task.dueDateDays > 0) {
        return {...task, dueDateDays: task.dueDateDays - 1 };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  const handleReadInputTask = (e) => {
    setNewTodo(e.target.value);
  };

  const handleReadInputDate = (e) => {
    setDueDate(e.target.value);
  };

  const handleReadInputSubject = (e) => {
    setSubject(e.target.value);
  }

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      name: newTodo,
      dueDateDays: parseInt(dueDateDays),
      subject: subject,
      priority: '',
      id: Date.now(),
    };
    setTasks([...tasks, newTask]);
    setNewTodo(""); // Reset input field
    setDueDate(""); // Reset input field
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCheckboxChange = (e, id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, checked: e.target.checked };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <Button
        specialStyle={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: "100",
        }}
      />
      <div className="todo-labels">
        <h1>TODO LIST</h1>
      </div>
      <div className="todolist">
        <form onSubmit={handleAddTask}>
          <input
            className="submit-task"
            value={newTodo}
            onChange={handleReadInputTask}
            required
          />
          <input
            className="submit-task"
            value={subject}
            onChange={handleReadInputSubject}
            required
          />
          <input
            type="number"
            className="submit-number"
            value={dueDateDays}
            onChange={handleReadInputDate}
            placeholder="0"
            
            min={0}
            required
          />
          <button className="add-todo-btn" type="submit">
            <span className="back"></span>
            <span className="front">ADD</span>
          </button>
        </form>
        <div
          className="tasks"
          style={{ overflowY: tasks.length === 6 ? "scroll" : "none" }}
        >
          {tasks.length === 0 && <h1>You Have No Task Left!</h1>}
          {tasks
            .slice()
            .reverse()
            .map((task) => (
              <div
                className="todo"
                key={task.id}
                style={{
                  textDecoration: task.checked ? "line-through" : "none",
                }}
              >
                <Checkbox
                  handleChange={(e) => handleCheckboxChange(e, task.id)}
                />
                <h1 className="task-name">{task.name}</h1>
                <h1 className="task-name">{task.subject}</h1>
                <h1 style={{ color: handlePriority(task), fontSize:'1.2em'}}>
                  {task.dueDateDays}
                </h1>
                <div className="delete-todo">
                  <Delete handleClick={() => handleDeleteTask(task.id)} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
