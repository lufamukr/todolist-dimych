import { TodolistsType } from "../App";

export type ActionType = {
  type: string;
  payload: {
    [key:string]: string
  }
}

export const todoReducer = (state:Array<TodolistsType>, action:ActionType) => {
  switch(action.type) {
    case "DELETE_TODO": 
      return state.filter((f) => {
        return f.id !== action.payload["id"]
      })

      case "ADD_TODO": 
      return [...state,  {id: action.payload["id"], title: action.payload.title, filter: action.payload["filter"]}
      ]

      case "CHANGE_TITLE_TODO": 
      state.find((f) => {
        if(f.id === action.payload["id"]) {
          f.title = action.payload["title"]
        }
      })
      return [...state]

      default:
        throw new Error("error error error")
  }


} 