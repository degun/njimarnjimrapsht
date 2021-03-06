import { SET_CUSTOM_CATEGORIES, SET_SMART_CATEGORIES, SET_TAGS, SET_TYPES,SET_RECENTLY_VIEWED, SET_MENU_OPEN, SET_REGISTERING, SET_LOGGING_IN } from '../types';

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

export function setRecentlyViewed(recentlyViewed) {
    return {
        type: SET_RECENTLY_VIEWED,
        recentlyViewed
    }
}

export function setMenuOpen(menuOpen) {
    return {
        type: SET_MENU_OPEN,
        menuOpen
    }
}

export function setRegistering(registering) {
    return {
        type: SET_REGISTERING,
        registering
    }
}

export function setLoggingIn(loggingIn) {
    return {
        type: SET_LOGGING_IN,
        loggingIn
    }
}