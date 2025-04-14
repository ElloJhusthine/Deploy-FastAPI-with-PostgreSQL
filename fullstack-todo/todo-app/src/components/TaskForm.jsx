import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/todos";

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await axios.post(API_URL, { title });
    setTitle("");
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
