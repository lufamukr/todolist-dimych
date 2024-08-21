import { StateType, userReducer } from "./user-reducer"

// user reducer should increment only age - Редуктор користувача повинен збільшувати лише вік
test("user reducer should increment only age",() => {

  const startState:StateType = { age: 20, childrenCount: 2, name: "Dimych" };
  const endState:StateType = userReducer(startState, {type:"INCREMENT_AGE"});

  expect (endState.age).toBe(21)
  expect (endState.childrenCount).toBe(2)

})

test("user reducer should increment only childrenCount",() => {

  const startState:StateType = { age: 20, childrenCount: 2, name: "Dimych" };
  const finState = userReducer(startState, {type:"INCREMENT-CHILDREN"})

  expect(finState.childrenCount).toBe(3)
  expect(finState.name).toBe("Dimych")

})
 
  