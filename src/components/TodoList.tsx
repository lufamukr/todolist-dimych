import React, { ChangeEvent, useState } from "react";
import { FilterPropsType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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
  
  changeTaskTitle: (idTask:string, title:string, idTodo:string) => void;
  changeTodoTitle: (idTodo:string, title:string) => void
};

export function TodoList(props: TodoListPropsType) {

  const onAllClickHandler = () => {
    props.changeFilter("all", props.idTodolists);
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.idTodolists);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.idTodolists);
  };

  const removeTodolist = () => {
    props.removeTodolist(props.idTodolists)
  }

  const currAddTask = (title: string) => {
    props.addTask(title, props.idTodolists)
  }

  const changeTodolistTitle = (title: string) => {
    props.changeTodoTitle(props.idTodolists, title)
  }

  return (
    <div>
      <h3><EditableSpan title={props.todoTitle} onChange={changeTodolistTitle}/> <button onClick={removeTodolist}>X</button></h3>
      <AddItemForm addItem={currAddTask} />
      <ul>
        {props.tasks.map((t) => {
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.taskStatus(t.id, e.currentTarget.checked, props.idTodolists);
          };

          const onChangeTitleHandler = (value:string) => {
            props.changeTaskTitle(t.id, value, props.idTodolists)
          };

          return (
            <li className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />{" "}
              <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
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

