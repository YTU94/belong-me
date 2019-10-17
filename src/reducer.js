import React, { useReducer } from "react"

const myContext = React.createContext()

function reducer(state, action) {
    switch (action.type) {
        case "setNickname":
            return { nickname: action.nickname, email: action.email }
        case "layout":
            return { nickname: action.nickname, email: action.email }
        default:
            throw new Error()
    }
}

export { reducer, myContext }
