import React, { ChangeEvent, useState } from "react";
import { FilterPropsType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { CheckBox, Delete } from "@mui/icons-material";

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

  changeTaskTitle: (idTask: string, title: string, idTodo: string) => void;
  changeTodoTitle: (idTodo: string, title: string) => void;
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
    props.removeTodolist(props.idTodolists);
  };

  const currAddTask = (title: string) => {
    props.addTask(title, props.idTodolists);
  };

  const changeTodolistTitle = (title: string) => {
    props.changeTodoTitle(props.idTodolists, title);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.todoTitle} onChange={changeTodolistTitle} />{" "}
        <IconButton onClick={removeTodolist} >
          <Delete>X</Delete>
        </IconButton>
      </h3>
      <AddItemForm addItem={currAddTask} />
      <ul>
        {props.tasks.map((t) => {
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.taskStatus(t.id, e.currentTarget.checked, props.idTodolists);
          };

          const onChangeTitleHandler = (value: string) => {
            props.changeTaskTitle(t.id, value, props.idTodolists);
          };

          return (
            <li className={t.isDone ? "is-done" : ""}>
              <Checkbox
                onChange={onChangeHandler}
                checked={t.isDone}
              />{" "}
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton
                size="medium"
                onClick={() => {
                  props.removeLi(t.id, props.idTodolists);
                }}
              >
                <Delete>x</Delete>
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          color="success"
          variant={props.filter === "all" ? "contained" : "text"}
          size={"small"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === "active" ? "contained" : "text"}
          size={"small"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={props.filter === "completed" ? "contained" : "text"}
          size={"small"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
