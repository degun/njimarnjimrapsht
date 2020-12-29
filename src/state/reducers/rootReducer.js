import { combineReducers } from "redux";
import appReducer from './appReducer';
import checkoutReducer from './checkoutReducer';
import productsReducer from './productsReducer';
import blogReducer from './blogReducer';

const rootReducer = combineReducers({
    app: appReducer,
    checkout: checkoutReducer,
    products: productsReducer,
    blog: blogReducer
})

export default rootReducer;