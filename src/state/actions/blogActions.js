import { SET_SELECTED_ARTICLE } from '../types';

export function setSelectedArticle(selectedArticle) {
    return {
        type: SET_SELECTED_ARTICLE,
        selectedArticle
    }
}
