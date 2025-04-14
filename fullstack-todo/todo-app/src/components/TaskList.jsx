import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, fetchTasks }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
        ))
      )}
    </div>
  );
};

export default TaskList;
