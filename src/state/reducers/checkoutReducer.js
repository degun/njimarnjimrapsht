import { SET_CHECKOUT_VALUES } from '../types';

const init = {
    id: "",
    lineItems: [],
    webUrl: "",
    subtotalPrice:"",
    totalPrice:"",
    totalTax:""
}

function checkoutReducer(state = init, action) {
    switch(action.type){
        case SET_CHECKOUT_VALUES:
            return {...action.checkout}
        default:
            return state
    }
}

export default checkoutReducer;