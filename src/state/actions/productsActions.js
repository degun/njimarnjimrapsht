import { SET_SELECTED_CATEGORY, SET_SELECTED_TAGS } from '../types';

export function setSelectedCategory(selectedCategory) {
    return {
        type: SET_SELECTED_CATEGORY,
        selectedCategory
    }
}

export function setSelectedTags(selectedTags) {
    return {
        type: SET_SELECTED_TAGS,
        selectedTags
    }
}