import {combineReducers} from "redux"

const auth = (state = {loginStatus: false}, action) => {
    switch (action.type){
        case "UP":
            return {loginStatus: action.state}
        default:
            return state
    }
}

export default combineReducers({
    auth,
})