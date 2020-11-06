import { combineReducers } from "redux";
import appReducer from './appReducer';
import checkoutReducer from './checkoutReducer';

const rootReducer = combineReducers({
    app: appReducer,
    checkout: checkoutReducer
})

export default rootReducer;