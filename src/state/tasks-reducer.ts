import { v1 } from "uuid";
import { TaskStateType } from "../App";
import { title } from "process";
import { TasksPropsType } from "../components/TodoList";
import { todolistId1, todolistId2 } from "./todolist-reducer";

export type RemoveActionType = {
  type: "REMOVE-TASK";
  payload: {
    idTask: string;
    todolistId: string;
  };
};

export type AdTaskACType = {
  type: "ADD-TASK";
  payload: {
    id: string;
    todolistId: string;
    title: string;
  };
};

export type ChangeTaskStatusType = {
  type: "CHANGE-TASK-STATUS";
  payload: {
    todolistId: string;
    taskId: string;
    isDoneIs: boolean;
  };
};

export type ChangeTaskTitleType = {
  type: "CHANGE-TASK-TITLE";
  payload: {
    todoId: string;
    taskId: string;
    title: string;
  };
};

export type addEmptyTasks = {
  type: "ADD-EMPTY-TASKS";
  payload: {
    todoId: string;
  };
};

export type AddArrForTodoType = {
  type: "ADD_TODO";
  payload: {
    idTodo: string;
  };
};

export type DeleteTodoType = {
  type: "DELETE_TODO";
  payload: {
    idTodo:string
  }
}

export type ActionsType =
  | RemoveActionType
  | AdTaskACType
  | ChangeTaskStatusType
  | ChangeTaskTitleType
  | AddArrForTodoType
  | DeleteTodoType;

  const initialState:TaskStateType = {}

export const tasksReducer = (
  state: TaskStateType = initialState,
  action: ActionsType
): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      const stateCopy = { ...state };
      const currentTasks = stateCopy[action.payload.todolistId];
      stateCopy[action.payload.todolistId] = currentTasks.filter((f) => {
        return f.id !== action.payload.idTask;
      });
      return stateCopy;

    case "ADD-TASK": {
      const stateCopy = { ...state };
      const currentTasks = stateCopy[action.payload.todolistId];
      let newTask = {
        id: action.payload.id,
        title: action.payload.title,
        isDone: false,
      };
      stateCopy[action.payload.todolistId] = [newTask, ...currentTasks];
      return stateCopy;
    }

    case "CHANGE-TASK-STATUS": {
      const tasks = state[action.payload.todolistId];
      if (!tasks) {
        console.error(
          `Tasks for todolistId ${action.payload.todolistId} not found`
        );
        return state; // або обробити це іншим чином
      }
      const updatedTask = tasks.map((m) => {
        return m.id === action.payload.taskId
          ? { ...m, isDone: action.payload.isDoneIs }
          : m;
      });
      return { ...state, [action.payload.todolistId]: updatedTask };
    }

    case "CHANGE-TASK-TITLE": {
      let stateCopy = { ...state };
      const currentTasks = stateCopy[action.payload.todoId];
      const updatedTasks = currentTasks.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, title: action.payload.title }
          : task
      );
      stateCopy[action.payload.todoId] = updatedTasks;

      return stateCopy;
    }

    case "ADD_TODO": {
      // Створюємо копію поточного стану
      const newState = { ...state };
      return {
        [action.payload.idTodo]: [], // Новий тудуліст з порожнім масивом
        ...newState, // Попередні тудулісти
      };
    }

    case "DELETE_TODO": {
      const { [action.payload.idTodo]: _, ...restState } = state;
      console.log('Updated state in reducer:', Object.keys(restState).length);
      return restState;
    }

    default:
      return state;
  }
};

export const removeTaskAC = (
  idTask: string,
  todolistId: string
): RemoveActionType => {
  return {
    type: "REMOVE-TASK",
    payload: { idTask: idTask, todolistId: todolistId },
  };
};
export const addTaskAC = (title: string, todolistId: string): AdTaskACType => {
  return {
    type: "ADD-TASK",
    payload: { id: v1(), title: title, todolistId: todolistId },
  };
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
): ChangeTaskStatusType => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: { todolistId: todolistId, isDoneIs: !isDone, taskId: taskId },
  };
};

export const changeTaskTitleAC = (
  todoId: string,
  taskId: string,
  title: string
): ChangeTaskTitleType => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: { todoId: todoId, taskId: taskId, title: title },
  };
};

export const addArrForTodoAC = (idTodo: string): AddArrForTodoType => {
  return { type: "ADD_TODO", payload: { idTodo } };
};

export const delTaskForDelTodoAC = (idTodo: string):DeleteTodoType => {
  return { type: "DELETE_TODO", payload: { idTodo }}
}
// AC - action creator
