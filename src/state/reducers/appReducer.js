import { SET_CUSTOM_CATEGORIES, SET_SMART_CATEGORIES, SET_TAGS, SET_TYPES, SET_RECENTLY_VIEWED, SET_MENU_OPEN, SET_REGISTERING, SET_LOGGING_IN } from '../types';

const init = {
    customCategories: [],
    smartCategories: [],
    tags: [],
    types: [],
    recentlyViewed: [],
    menuOpen: true,
    registering: false,
    loggingIn: false
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
        case SET_RECENTLY_VIEWED:
            return {
                ...state, 
                recentlyViewed: action.recentlyViewed
            }
        case SET_MENU_OPEN:
            return {
                ...state, 
                menuOpen: action.menuOpen
            }
        case SET_REGISTERING:
            return {
                ...state, 
                registering: action.registering
            }
        case SET_LOGGING_IN:
            return {
                ...state, 
                loggingIn: action.loggingIn
            }
        default:
            return state
    }
}

export default homeReducer;