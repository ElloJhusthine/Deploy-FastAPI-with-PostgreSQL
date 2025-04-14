import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const API_URL = "http://localhost:8000/todos";

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
      <h1>To-Do App</h1>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Mode</button>
      <div>
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
