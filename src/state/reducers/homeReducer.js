import { SET_TOP_CATEGORY } from '../types';

const init = {
    category: ""
}

function homeReducer(state = init, action) {
    switch(action.type){
        case SET_TOP_CATEGORY:
            return {
                ...state, 
                category: action.category
            }
        default:
            return state
    }
}

export default homeReducer;