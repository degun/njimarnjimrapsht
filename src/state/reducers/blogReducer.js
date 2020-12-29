import { SET_SELECTED_ARTICLE } from '../types';

const init = {
    selectedArticle: null,
}

function blogReducer(state = init, action) {
    switch(action.type){
        case SET_SELECTED_ARTICLE:
            return {
                ...state, 
                selectedArticle: action.selectedArticle
            }
        default:
            return state
    }
}

export default blogReducer;