const initialState = {}

export default function(state = initialState, action) {
    switch (action.type) {
        case "ADD_USERINFO":
            return action.payload
        default:
            return state
    }
}
