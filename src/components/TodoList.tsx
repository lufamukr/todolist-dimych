import React, { ChangeEvent, useState } from "react";
import { FilterPropsType } from "../App";

export type TasksPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  tasks: Array<TasksPropsType>;
  removeLi: (id: string, todoId: string) => void;
  changeFilter: (value: FilterPropsType, todolistsId: string) => void;
  addTask: (title: string, todoId: string) => void;
  taskStatus: (taskId: string, isDoneIs: boolean, todoId: string) => void;
  filter: FilterPropsType;
  todoTitle: string;
  idTodolists: string;
  removeTodolist: (idTodo: string) => void;
};

export function TodoList(props: TodoListPropsType) {
  const inInputAddTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  let [newTaskTitle, setNewTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onAllClickHandler = () => {
    props.changeFilter("all", props.idTodolists);
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.idTodolists);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.idTodolists);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      if (newTaskTitle.trim() !== "") {
        props.addTask(newTaskTitle.trim(), props.idTodolists);
        setNewTaskTitle("");
      } else {
        setError("Field is required");
      }
    }
  };

  const removeTodolist = () => {
    props.removeTodolist(props.idTodolists)
  }

  return (
    <div>
      <h3>{props.todoTitle} <button onClick={removeTodolist}>X</button></h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={inInputAddTitle}
          className={error ? "error" : ""}
          onKeyUp={onKeyDownHandler}
        />
        <button
          onClick={() => {
            if (newTaskTitle.trim() !== "") {
              props.addTask(newTaskTitle.trim(), props.idTodolists);
              setNewTaskTitle("");
            } else {
              setError("Field is required");
            }
          }}
        >
          +
        </button>
        {{ error } && <div className="error-msg">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.taskStatus(t.id, e.currentTarget.checked, props.idTodolists);
          };

          return (
            <li className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />{" "}
              <span>{t.title}</span>
              <button
                onClick={() => {
                  props.removeLi(t.id, props.idTodolists);
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
