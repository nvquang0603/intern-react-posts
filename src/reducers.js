import { combineReducers} from "redux";
import postListReducer from './modules/reducers/postList';
import postFilterReducer from './modules/reducers/postFilter';

const rootReducer = combineReducers({
    postListReducer,
    postFilterReducer
});

export default rootReducer;