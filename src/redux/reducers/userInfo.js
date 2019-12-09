export default function(state = {}, action) {
    switch (action.type) {
        case "ADD_USERINFO":
            return action.e

        default:
            return false
    }
}
