import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react"

type EditableSpanType = {
  title: string;
  onChange: (value:string) => void;
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
  console.log('EditableSpan rendered')

  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("")

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title)
  }

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  }

  const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }

  return(
    editMode ? <TextField variant="standard" value={title} onBlur={activateViewMode} autoFocus onChange={onChangeTitle}/> :
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
})

// 07 todolist for students start


