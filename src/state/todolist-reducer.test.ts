import { v1 } from "uuid";
import { ActionType, todoReducer } from "./todolist-reducer";
import { TodolistsType } from "../App";

const actionMaker = <T extends ActionType['type']>(type: T, payload: Extract<ActionType, { type: T }>['payload']) => {
  return {
    type: type,
    payload: {
      ...payload
    }
  }
}


let todolistId1 = v1();
let todolistId2 = v1();

const startState: Array<TodolistsType> = [
  { id: todolistId1, title: "What", filter: "all" },
  { id: todolistId2, title: "what2", filter: "all" },
];

test("delete todolist", () => {

  const act:ActionType = actionMaker("DELETE_TODO", { idTodo: todolistId1 })

  // const action: ActionType = {
  //   type: "DELETE_TODO",
  //   payload: {
  //     id: todolistId1,
  //   },
  // };
  const endState = todoReducer(startState, act);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("add todolist", () => {
  const action: ActionType = {
    type: "ADD_TODO",
    payload: {
      idTodo: v1(),
      title: "new",
      filter: "all",
    },
  };
  const endState = todoReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].filter).toBe("all");
  expect(endState[0].title).toBe("new");
});

test("change title of todolist", () => {
  const action: ActionType = {
    type: "CHANGE_TITLE_TODO",
    payload: {
      idTodo: todolistId2,
      title: "Modified Title",
    },
  };
  const endState = todoReducer(startState, action);

  expect(endState[1].title).toBe("Modified Title");
  expect(endState.length).toBe(2);
});