import React, { useState } from "react";
import TaskListItems from "./TaskListItems";
import AddTask from "./AddTask.js";
import style from "./listItems.module.css";

const ListItems = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(true);

  const handleDelete = (id) => {
    setItems(items.filter((task) => task.id !== id));
  };

  const handleDeleteCompleted = () => {
    if (
      window.confirm("Are you sure you want to delete all completed tasks?")
    ) {
      const completedTasks = items.filter((item) => !item.status);
      setItems(completedTasks);
    }
  };

  const handleDeletePending = () => {
    if (window.confirm("Are you sure you want to delete all pending tasks?")) {
      const completedTasks = items.filter((item) => item.status);
      setItems(completedTasks);
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      setItems([]);
    }
  };

  return (
    <div>
      <h1 className={style.dataHeading}>Add Task</h1>
      <AddTask tasks={items} setTasks={setItems} />
      <h1 className={style.listHeading}>Task List</h1>
      <button className={style.toggle} onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"}
      </button>
      <span className={style.buttons}>
        <button className={style.completed} onClick={handleDeleteCompleted}>
          Delete Completed
        </button>
        <button className={style.pending} onClick={handleDeletePending}>
          Delete Pending
        </button>
        <button className={style.all} onClick={handleDeleteAll}>
          Delete All
        </button>
      </span>
      <ul>
        {show &&
          items.map((item) => (
            <TaskListItems
              key={item.id}
              task={item}
              deleteTask={handleDelete}
            />
          ))}
      </ul>
    </div>
  );
};

export default ListItems;
