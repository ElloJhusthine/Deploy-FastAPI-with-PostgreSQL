import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/todos";

const TaskItem = ({ task, fetchTasks }) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleDelete = async () => {
    await axios.delete(`${API_URL}/${task.id}`);
    fetchTasks();
  };

  const handleToggle = async () => {
    await axios.put(`${API_URL}/${task.id}`, {
      title: task.title,
      completed: !task.completed,
    });
    fetchTasks();
  };

  const handleEdit = async () => {
    await axios.put(`${API_URL}/${task.id}`, {
      title: newTitle,
      completed: task.completed,
    });
    setEditing(false);
    fetchTasks();
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
      {editing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
