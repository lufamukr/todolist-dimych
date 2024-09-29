import { v1 } from "uuid";
import { TodolistsType } from "../AppWithRedux";
import { FilterPropsType } from "../AppWithRedux";


export type DeleteTodoType = {
  type: "DELETE_TODO";
  payload: {
    idTodo: string;
  }
}

export type AddTodoType = {
  type: "ADD_TODO";
  payload: {
    idTodo: string;
    title: string;
    filter: FilterPropsType;
  }
}

export type ChangeTitleTodoType = {
  type: "CHANGE_TITLE_TODO";
  payload: {
    idTodo: string;
    title:string;
  }
}

export type ChangeFilterType = {
  type: "CHANGE_FILTER";
  payload: {
    value: FilterPropsType; 
    todolistsId: string;
  }
}

export type ActionType = DeleteTodoType | AddTodoType | ChangeTitleTodoType | ChangeFilterType;

export const todolistId1 = v1()
export const todolistId2 = v1()

let initialState:Array<TodolistsType> = [
  { id: todolistId1, title: "reducer", filter: "all" },
  { id: todolistId2, title: "redu2", filter: "all" },
]

export const todoReducer = (state:Array<TodolistsType> = initialState, action:ActionType):Array<TodolistsType> => {
  switch(action.type) {
    case "DELETE_TODO": 
      const updatedState = state.filter((f) => f.id !== action.payload.idTodo);

      return updatedState;

      case "ADD_TODO": 
        const newState = [{id:action.payload.idTodo, title:action.payload.title, filter:action.payload.filter }, ...state] 
        return newState

      case "CHANGE_TITLE_TODO": {
        const newState = [...state]
        const updatedState = newState.map((m) => {
          return m.id === action.payload.idTodo ? { ...m, title: action.payload.title } : m
        })
        return updatedState
      }

      case "CHANGE_FILTER": {
        const stateCopy = [...state]
        const updatedState = stateCopy.map((m) => {
        return m.id === action.payload.todolistsId ? {...m, filter: action.payload.value} : m})
        return updatedState
      }

      default:
        // throw new Error("error error error")
        return state;
  }

}

export const deleteTodoAC = (idTodo:string):ActionType => {
  return {type:"DELETE_TODO", payload: {idTodo}}
}

export const addTodoAC = (title: string):ActionType => {
  return {type:"ADD_TODO", payload: {idTodo: v1(), title, filter: 'all'}}
}

export const changeTitleTodoAC = (idTodo: string, title:string):ChangeTitleTodoType => {
  return {type:"CHANGE_TITLE_TODO", payload: {idTodo, title}}
}

export const changeFilterAC = (value: FilterPropsType, todolistsId: string):ChangeFilterType => {
  return { type:"CHANGE_FILTER", payload: {value:value, todolistsId}}
}