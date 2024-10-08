import { addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer } from './tasks-reducer'
import { TaskStateType } from '../App'
 
test('correct task should be deleted from correct array', () => {
  const startState: TaskStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }
 
  const action = removeTaskAC("2", "todolistId2")

  const endState = tasksReducer(startState, action)
 
  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId2'].every(t => t.id !== "2")).toBe(true)
  
})


test('correct task should be added to correct array', () => {
  const startState: TaskStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }
 
  const endState = tasksReducer(startState, addTaskAC( 'juce', 'todolistId2' ))
 
  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('correct task should be change status', () => {
  const startState: TaskStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }
 
  let endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', !startState['todolistId2'][1].isDone, '2'))
  expect(endState['todolistId2'].length).toBe(3)
  expect(endState['todolistId2'][1].title).toBe('milk')
  expect(endState['todolistId2'][1].isDone).toBe(true)  

  endState = tasksReducer(startState, changeTaskStatusAC('todolistId1', true, '1'))
  expect(endState['todolistId1'][0].title).toBe('CSS')
  expect(endState['todolistId1'][0].isDone).toBeFalsy()

})