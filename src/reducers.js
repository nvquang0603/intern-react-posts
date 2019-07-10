import {combineReducers} from "redux";
import postTableReducer from './modules/reducers/postTable';
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
    postTableReducer,
    toastr: toastrReducer
});

export default rootReducer;