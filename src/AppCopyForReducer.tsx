import React, { useReducer, useState } from "react";
import "./App.css";
import { TasksPropsType, TodoList } from "./components/TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import {
  addArrForTodoAC,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  delTaskForDelTodoAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import { addTodoAC, changeFilterAC, changeTitleTodoAC, deleteTodoAC, todoReducer } from "./state/todolist-reducer";
export type FilterPropsType = "all" | "completed" | "active";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterPropsType;
};

let todolistId1 = v1();
let todolistId2 = v1();

export type TaskStateType = {
  [key: string]: Array<TasksPropsType>;
};

function AppCopyForReducer() {
  let [todolists, dispatchToTodolistsReducer] = useReducer(todoReducer, [
    { id: todolistId1, title: "reducer", filter: "all" },
    { id: todolistId2, title: "redu2", filter: "all" },
  ]);

  let [currTasks, dispatchToTaskReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS + React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Water", isDone: true },
      { id: v1(), title: "Juice", isDone: false },
    ],
  });

  function removeLi(id: string, todoId: string) {
    const action = removeTaskAC(id, todoId);
    dispatchToTaskReducer(action);
  }

  function addTask(title: string, todoId: string) {
    const action = addTaskAC(title, todoId);
    dispatchToTaskReducer(action);
  }

  function changeFilter(value: FilterPropsType, todolistsId: string) {
    const action = changeFilterAC(value, todolistsId)
    dispatchToTodolistsReducer(action)
  }

  function changeTaskStatus(taskId: string, isDone: boolean, todoId: string) {
    const action = changeTaskStatusAC(taskId, isDone, todoId);
    dispatchToTaskReducer(action);
  }

  const removeTodolist = (idTodo: string) => {
    const action = deleteTodoAC(idTodo);
    dispatchToTodolistsReducer(action);
    dispatchToTaskReducer(delTaskForDelTodoAC(idTodo))
  };

  function addTodolist(title: string) {
    const idTodo = v1()
    const action = addTodoAC(title, idTodo)
    dispatchToTodolistsReducer(action)
    dispatchToTaskReducer(addArrForTodoAC(idTodo))
  }

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color={"info"}>
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todolists
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container>
        <Grid container style={{ padding: "45px 15px", paddingLeft: 0 }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={6}>
          {todolists.map((m) => {
            let tasksForTodoList = currTasks[m.id];

            if (m.filter === "completed") {
              tasksForTodoList = tasksForTodoList.filter((t) => {
                return t.isDone === true;
              });
            }
            if (m.filter === "active") {
              tasksForTodoList = tasksForTodoList.filter((t) => {
                return t.isDone === false;
              });
            }

            const changeTaskTitle = (
              idTask: string,
              title: string,
              idTodo: string
            ) => {
              const action = changeTaskTitleAC(idTodo, idTask, title);
              dispatchToTaskReducer(action);
            };

            const changeTodoTitle = (idTodo: string, title: string) => {
              const action = changeTitleTodoAC(idTodo, title)
              dispatchToTodolistsReducer(action)
            };

            return (
              <Grid item>
                <Paper
                  style={{ padding: "15px", backgroundColor: "info" }}
                  elevation={4}
                >
                  <TodoList
                    removeTodolist={removeTodolist}
                    tasks={tasksForTodoList}
                    key={m.id}
                    removeLi={removeLi}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    taskStatus={changeTaskStatus}
                    filter={m.filter}
                    idTodolists={m.id}
                    todoTitle={m.title}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoTitle={changeTodoTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppCopyForReducer;

{
  /* 
  10 todolist  20min 
  
  */
}
