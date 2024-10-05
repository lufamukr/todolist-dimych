import React from "react";
import { ChangeEvent, useState } from "react";
import { IconButton, TextField } from '@mui/material';
import AddToPhotosTwoToneIcon from '@mui/icons-material/AddToPhotosTwoTone';
import { v1 } from "uuid";

type AddItemFormType = {
  addItem: (title: string, idTodo: string) => void;
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
  console.log('AddItemForm rendered')

  let [newTaskTitle, setNewTaskTitle] = useState("");

  const inInputAddTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  let [error, setError] = useState<string | null>(null);


  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      const idTask = v1()
      props.addItem(newTaskTitle.trim(), idTask);
      setNewTaskTitle("");
    } else {
      setError("Field is required");
    }
  }

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(error !== null) {
      setError(null);
    }
    if (e.key === "Enter") {
      if (newTaskTitle.trim() !== "") {
        const idTask = v1()
        props.addItem(newTaskTitle.trim(), idTask);
        setNewTaskTitle("");
      } else {
        setError("Field is required");
      }
    }
  };

  return(
    <div>
    <TextField
      value={newTaskTitle}
      variant="outlined"
      label={"type value"}
      onChange={inInputAddTitle}
      onKeyUp={onKeyDownHandler}
      error={!!error}
      helperText={error}
    />
    <IconButton
      onClick={addTask}
    >
      <AddToPhotosTwoToneIcon fontSize="large">+</AddToPhotosTwoToneIcon>
    </IconButton>
  </div>
  )
})

