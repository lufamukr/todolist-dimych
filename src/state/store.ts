import { todoReducer } from "./todolist-reducer";
import { tasksReducer } from "./tasks-reducer";
import { combineReducers, createStore } from "redux";

{/*сигнатура функції createStore() у версіях Redux, починаючи з 4.x і вище, була позначена як застаріла. Це не означає, що функція не працює, але вона більше не є рекомендованим способом створення Redux store.

// Натомість рекомендується використовувати configureStore() з бібліотеки @reduxjs/toolkit (RTK), яка є офіційним стилем написання Redux-додатків і спрощує конфігурацію store.*/}

const rootReducer = combineReducers({
  todolists: todoReducer,
  currTasks: tasksReducer,
})

export type AppRootState = ReturnType <typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store

