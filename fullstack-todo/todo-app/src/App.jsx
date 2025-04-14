import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import './App.css'; // Ensure this is imported for styling

const API_URL = "https://deploy-fastapi-with-postgresql.onrender.com/todos";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    let url = API_URL;
    if (filter === "completed") url += "/filter/true";
    else if (filter === "pending") url += "/filter/false";

    const response = await axios.get(url);
    setTasks(response.data);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <h1 className={darkMode ? "dark-heading" : "light-heading"}>To-Do List application</h1>
      
      {/* Dark Mode Toggle Button */}
      <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <span className="slider"></span>
      </label>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
}

export default App;
