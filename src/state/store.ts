import { todoReducer } from "./todolist-reducer";
import { tasksReducer } from "./tasks-reducer";
import { combineReducers, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

{/*сигнатура функції createStore() у версіях Redux, починаючи з 4.x і вище, була позначена як застаріла. Це не означає, що функція не працює, але вона більше не є рекомендованим способом створення Redux store.

// Натомість рекомендується використовувати configureStore() з бібліотеки @reduxjs/toolkit (RTK), яка є офіційним стилем написання Redux-додатків і спрощує конфігурацію store.*/}

const rootReducer = combineReducers({
  todolists: todoReducer,
  currTasks: tasksReducer,
})

export type AppRootState = ReturnType <typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",  // Redux DevTools активуються лише в режимі розробки
});

// @ts-ignore
window.store = store

