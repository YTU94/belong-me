import { ADD_TODO, TOGGLE_TODO, SET_FILTER } from "./actionTypes"

let nextTodoId = 0

export const addTodo = content => ({
    type: ADD_TODO,
    payload: {
        id: ++nextTodoId,
        content
    }
})

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } })

export const addUserInfo = e => {
    console.log("0", e)
    return {
        type: "ADD_USERINFO",
        payload: e
    }
}
