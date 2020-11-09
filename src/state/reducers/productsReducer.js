import { SET_SELECTED_CATEGORY, SET_SELECTED_TAGS } from '../types';

const init = {
    selectedCategory: {
        handle: "",
        title: ""
    },
    selectedTags: []
}

function productsReducer(state = init, action) {
    switch(action.type){
        case SET_SELECTED_CATEGORY:
            return {
                ...state, 
                selectedCategory: action.selectedCategory
            }
        case SET_SELECTED_TAGS:
            return {
                ...state, 
                selectedTags: action.selectedTags
            }
        default:
            return state
    }
}

export default productsReducer;