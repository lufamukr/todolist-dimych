import { ChangeEvent, useState } from "react"

type EditableSpanType = {
  title: string;
  onChange: (value:string) => void;
}

export function EditableSpan(props: EditableSpanType) {

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
    editMode ? <input type="text" value={title} onBlur={activateViewMode} autoFocus onChange={onChangeTitle}/> :
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}

// 06 todolist for students 32min


