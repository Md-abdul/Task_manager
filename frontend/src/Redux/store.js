import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";


import {reducer as authReduer} from "../Redux/User/reducer"
import {reducer as taskReducer} from "../Redux/Task/reducer"
const rootReducer = combineReducers({
    authReduer,
    taskReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
