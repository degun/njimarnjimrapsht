import { SET_TOP_CATEGORY } from '../types';

export function setTopCategory(category) {
    return {
        type: SET_TOP_CATEGORY,
        category
    }
}