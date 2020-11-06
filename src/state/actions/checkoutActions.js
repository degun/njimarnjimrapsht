import { SET_CHECKOUT_VALUES } from '../types';

export function setCheckoutValues(checkout) {
    return {
        type: SET_CHECKOUT_VALUES,
        checkout
    }
}
