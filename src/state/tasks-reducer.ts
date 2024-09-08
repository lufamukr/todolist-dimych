import { v1 } from "uuid";
import { TaskStateType } from "../App";

export type RemoveActionType = {
  type:"REMOVE-TASK";
  idTask:string;
  todolistId:string;
}

export type AdTaskACType = {
  type:"ADD-TASK";
  todolistId:string;
  title:string;
}

export type ChangeTaskStatusType = {
  type:"CHANGE-TASK-STATUS"; 
  todolistId:string;
  taskId:string;
}

export type ActionsType = RemoveActionType | AdTaskACType | ChangeTaskStatusType;

export const tasksReducer = (state:TaskStateType, action:ActionsType):TaskStateType => {
  switch(action.type) {
    case "REMOVE-TASK": {
      const stateCopy = {...state}
      let tasks = stateCopy[action.todolistId]
      const filteredTasks = tasks.filter((f)=>{return f.id !== action.idTask})
      // important я не можу зробити tasks = filteredTask, тому:
      stateCopy[action.todolistId] = filteredTasks;
      return {...stateCopy}
    }

    case "ADD-TASK": {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistId] 
      const newTask = { id: v1(), title: action.title, isDone: false }
      const newTasks = [newTask, ...tasks]
      stateCopy[action.todolistId] = newTasks
      return {...stateCopy}
    }

    case "CHANGE-TASK-STATUS": {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistId]
      const task = tasks.find((f) => {
        return f.id === action.taskId
      })
      if(task) {
        task.isDone = !task.isDone;
      }
      return stateCopy
    }

    default: throw new Error("type error")
  }

} 

export const removeTaskAC = (idTask:string, todolistId:string):RemoveActionType => {
  return {type:"REMOVE-TASK", idTask:idTask, todolistId:todolistId}
}

export const addTaskAC = (title:string, todolistId:string):AdTaskACType => {
  return {type:"ADD-TASK", title:title, todolistId:todolistId}
}

export const changeTaskStatus = (todolistId:string, taskId:string):ChangeTaskStatusType => {
  return {type:"CHANGE-TASK-STATUS", todolistId:todolistId, taskId:taskId}
}
// AC - action creator
