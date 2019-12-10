const initialState = {}

export default function(state = initialState, action) {
    console.log('1', action);
    switch (action.type) {
        case "ADD_USERINFO":
            return action.payload
        default:
            return state
    }
}
