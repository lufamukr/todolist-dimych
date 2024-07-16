import React, { useState } from "react";
import "./App.css";
import { TasksPropsType, TodoList } from "./components/TodoList";
import { v1 } from "uuid";

export type FilterPropsType = "all" | "completed" | "active";

type TodolistsType = {
  id: string;
  title: string;
  filter: FilterPropsType;
};

function App() {
  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: v1(), title: "What", filter: "active" },
    { id: v1(), title: "what2", filter: "completed" },
  ]);

  let [currTasks, setTasks] = useState<Array<TasksPropsType>>([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS + React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  function removeLi(id: string) {
    let filteredTask = currTasks.filter((t) => {
      return t.id !== id;
    });
    setTasks(filteredTask);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...currTasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterPropsType, todolistsId: string) {
    let todolist = todolists.find((f) => {
      return f.id === todolistsId;
    });
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function changeTaskStatus(taskId: string, isDoneIs: boolean) {
    let task = currTasks.find((t) => {
      return t.id === taskId;
    });
    if (task) {
      task.isDone = isDoneIs;
    }
    setTasks([...currTasks]);
  }

  return (
    <div className="App">
      {todolists.map((m) => {
        let tasksForTodoList = currTasks;

        if (m.filter === "completed") {
          tasksForTodoList = currTasks.filter((t) => {
            return t.isDone === true;
          });
        }
        if (m.filter === "active") {
          tasksForTodoList = currTasks.filter((t) => {
            return t.isDone === false;
          });
        }

        return (
          <TodoList
            tasks={tasksForTodoList}
            key={m.id}
            removeLi={removeLi}
            changeFilter={changeFilter}
            addTask={addTask}
            taskStatus={changeTaskStatus}
            filter={m.filter}
            idTodolists={m.id}
            todoTitle={m.title}
          />
        );
      })}
    </div>
  );
}

// 5 todolist for students 05 - 31min

export default App;

