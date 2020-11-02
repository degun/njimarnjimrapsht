import { SET_CUSTOM_CATEGORIES, SET_SMART_CATEGORIES, SET_TAGS, SET_TYPES } from '../types';

const init = {
    customCategories: [],
    smartCategories: [],
    tags: [],
    types: []
}

function homeReducer(state = init, action) {
    switch(action.type){
        case SET_CUSTOM_CATEGORIES:
            return {
                ...state, 
                customCategories: action.customCategories
            }
        case SET_SMART_CATEGORIES:
            return {
                ...state, 
                smartCategories: action.smartCategories
            }
        case SET_TAGS:
            return {
                ...state, 
                tags: action.tags
            }
        case SET_TYPES:
            return {
                ...state, 
                types: action.types
            }
        default:
            return state
    }
}

export default homeReducer;