import React, { useReducer } from "react"

const myContext = React.createContext()

function reducer(state, action) {
    console.log(action, "---action")
    switch (action.type) {
        case "setNickname":
            return { nickname: action.nickname }
        case "layout":
            return { nickname: action.nickname }
        default:
            throw new Error()
    }
}

export { reducer, myContext }
