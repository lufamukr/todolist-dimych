import { ChangeEvent, useState } from "react";

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
    <input
      value={newTaskTitle}
      onChange={inInputAddTitle}
      className={error ? "error" : ""}
      onKeyUp={onKeyDownHandler}
    />
    <button
      onClick={addTask}
    >
      +
    </button>
    {{ error } && <div className="error-msg">{error}</div>}
  </div>
  )
}

