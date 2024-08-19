import React, { useState } from "react";
import "./App.css";
import { TasksPropsType, TodoList } from "./components/TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";


import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import { AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu, Padding } from "@mui/icons-material";
export type FilterPropsType = "all" | "completed" | "active";

type TodolistsType = {
  id: string;
  title: string;
  filter: FilterPropsType;
};

let todolistId1 = v1();
let todolistId2 = v1();

type TaskStateType = {
  [key: string]: Array<TasksPropsType>
}

function App() {
  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistId1, title: "What", filter: "all" },
    { id: todolistId2, title: "what2", filter: "all" },
  ]);

  let [currTasks, setTasks] = useState<TaskStateType>({
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
    let todo = currTasks[todoId];
    let filteredTask = todo.filter((t) => {
      return t.id !== id;
    });
    currTasks[todoId] = filteredTask;
    setTasks({ ...currTasks });
  }

  function addTask(title: string, todoId: string) {
    let todo = currTasks[todoId];
    let newTask = { id: v1(), title: title, isDone: false };
    currTasks[todoId] = [newTask, ...todo];
    setTasks({ ...currTasks });
  }

  function changeFilter(value: FilterPropsType, todolistsId: string) {
    let todolist = todolists.find((f) => {
      return f.id === todolistsId;
    });
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function changeTaskStatus(taskId: string, isDoneIs: boolean, todoId: string) {
    let todo = currTasks[todoId];
    let task = todo.find((t) => {
      return t.id === taskId;
    });
    if (task) {
      task.isDone = isDoneIs;
      setTasks({ ...currTasks });
    }
  }

  const removeTodolist = (idTodo: string) => {
    let filteredTodolist = todolists.filter((f) => f.id !== idTodo);
    setTodolists(filteredTodolist);
    delete currTasks[idTodo];
    setTasks({ ...currTasks });
  };

  function addTodolist(title: string) {
    let todolist:TodolistsType = { id: v1(), title: title, filter: "all" };
    setTodolists([todolist, ...todolists]);
    setTasks({...currTasks,
      [todolist.id]: []
    })
  }

  return (
    
    <div className="App">

<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={'info'}>
        <Toolbar>
          <IconButton
            size="large"
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
    <Grid container style={ {padding: "45px 15px", paddingLeft: 0} }>
      <AddItemForm addItem={addTodolist} />
    </Grid>

    <Grid container spacing={10}>
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

  const changeTaskTitle = (idTask:string, title:string, idTodo:string) => {
    let todolist = currTasks[idTodo];
    let task = todolist.find((f) => {
      return f.id === idTask
    })
    if(task) {
      task.title = title
      setTasks({...currTasks})
    }

  }

  const changeTodoTitle = (idTodo:string, title: string) => {
    let todolist = todolists.find((f)=>{
      return f.id === idTodo
    })
    if(todolist) {
      todolist.title = title;
      setTodolists([...todolists])
    }
  }

  return (
    <Grid item>
      <Paper style={ {padding:"15px", backgroundColor:"info"} } elevation={8}>
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

export default App;
