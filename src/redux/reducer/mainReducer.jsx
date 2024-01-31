import { actionTypes } from "../actions/actions"

const initailData = {
    loginData : {},
}

const mainReducer = (state = initailData, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGIN_DATA:
            return {
                ...state,
                loginData: action?.payload
            }
        default:
            return state;
    }
}

export default mainReducer;