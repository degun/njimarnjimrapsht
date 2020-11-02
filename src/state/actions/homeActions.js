import { SET_CUSTOM_CATEGORIES, SET_SMART_CATEGORIES, SET_TAGS, SET_TYPES } from '../types';

export function setCustomCategories(customCategories) {
    return {
        type: SET_CUSTOM_CATEGORIES,
        customCategories
    }
}


export function setSmartCategories(smartCategories) {
    return {
        type: SET_SMART_CATEGORIES,
        smartCategories
    }
}

export function setTags(tags) {
    return {
        type: SET_TAGS,
        tags
    }
}

export function setTypes(types) {
    return {
        type: SET_TYPES,
        types
    }
}