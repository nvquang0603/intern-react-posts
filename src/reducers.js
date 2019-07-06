import { combineReducers } from "redux";
import postTableReducer from './modules/reducers/postTable';


const rootReducer = combineReducers({
    postTableReducer
});

export default rootReducer;