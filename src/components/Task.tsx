import { ChangeEvent, useCallback } from "react";
import { TasksPropsType } from "./TodoList";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import React from "react";

export type ComponentTaskPropsType = {
  taskStatus: (taskId: string, isDoneIs: boolean, todoId: string) => void;
  idTodolists: string;
  changeTaskTitle: (idTask: string, title: string, idTodo: string) => void;
  removeLi: (id: string, todoId: string) => void;
  t: TasksPropsType
}

export const Task = React.memo((props: ComponentTaskPropsType) => {

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    props.taskStatus(props.t.id, !e.currentTarget.checked, props.idTodolists);
  }, [props.taskStatus, props.t.id, props.idTodolists]);

  const onChangeTitleHandler = useCallback((value: string) => {
    props.changeTaskTitle(props.t.id, value, props.idTodolists);
  }, [props.changeTaskTitle, props.t.id, props.idTodolists]);

  return (
    <li className={props.t.isDone ? "is-done" : ""} key={props.t.id}>
      <Checkbox
        onChange={onChangeHandler}
        checked={props.t.isDone}
      />{" "}
      <EditableSpan title={props.t.title} onChange={onChangeTitleHandler} />
      <IconButton
        size="medium"
        onClick={() => {
          props.removeLi(props.t.id, props.idTodolists);
        }}
      >
        <Delete>x</Delete>
      </IconButton>
    </li>)
})