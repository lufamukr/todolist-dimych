import { ChangeEvent, useState } from "react";
import { IconButton, TextField } from '@mui/material';
import AddToPhotosTwoToneIcon from '@mui/icons-material/AddToPhotosTwoTone';

type AddItemFormType = {
  addItem: (title: string) => void;
}

export function AddItemForm(props: AddItemFormType) {

  let [newTaskTitle, setNewTaskTitle] = useState("");

  const inInputAddTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  let [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Field is required");
    }
  }

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      if (newTaskTitle.trim() !== "") {
        props.addItem(newTaskTitle.trim());
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
}

