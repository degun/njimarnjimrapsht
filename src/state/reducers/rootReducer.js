import { combineReducers } from "redux";
import appReducer from './appReducer';
import checkoutReducer from './checkoutReducer';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
    app: appReducer,
    checkout: checkoutReducer,
    products: productsReducer
})

export default rootReducer;