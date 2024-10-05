import React, { useCallback } from "react";
import "./App.css";
import { TasksPropsType, TodoList } from "./components/TodoList";
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
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  delTaskForDelTodoAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import { addTodoAC, changeFilterAC, changeTitleTodoAC, deleteTodoAC, todoReducer } from "./state/todolist-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";
export type FilterPropsType = "all" | "completed" | "active";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterPropsType;
};


export type TaskStateType = {
  [key: string]: Array<TasksPropsType>;
};

function AppWithRedux() {
  console.log('AppWithRedux rendered')

  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<TodolistsType>>(state => state.todolists)
  const currTasks = useSelector<AppRootState, TaskStateType>(state => state.currTasks)
  
  const removeLi = useCallback((id: string, todoId: string) => {
    dispatch(removeTaskAC(id, todoId));
  }, [dispatch])

  const addTask = useCallback((title: string, todoId: string) => {
    dispatch(addTaskAC(title, todoId));
  }, [dispatch])

  const changeFilter = useCallback((value: FilterPropsType, todolistsId: string) => {
    const action = changeFilterAC(value, todolistsId)
    dispatch(action)
  }, [dispatch])

  const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoId: string) => {
    const action = changeTaskStatusAC(taskId, isDone, todoId);
    dispatch(action);
  }, [dispatch])

  const removeTodolist = useCallback((idTodo: string) => {
    const action = deleteTodoAC(idTodo);
    dispatch(action);
    dispatch(delTaskForDelTodoAC(idTodo))
  }, [dispatch])

  const addTodolist = useCallback((title: string, idTodo: string) => {
    dispatch(addTodoAC(title, idTodo))
  }, [dispatch])

  const changeTaskTitle = useCallback((
    idTask: string,
    title: string,
    idTodo: string
  ) => {
    const action = changeTaskTitleAC(idTodo, idTask, title);
    dispatch(action);
  }, [dispatch])

  const changeTodoTitle = useCallback((idTodo: string, title: string) => {
    const action = changeTitleTodoAC(idTodo, title)
    dispatch(action)
  }, [])

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
            let tasksTodoList = currTasks[m.id];
            let tasksForTodoList = tasksTodoList

            return (
              <Grid item key={m.id}>
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

export default AppWithRedux;

{
  /* 
  11 todolist  1.20min 
  
  */
}
