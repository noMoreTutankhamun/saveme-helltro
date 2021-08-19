import { combineReducers } from 'redux';
import user from './user';
import write from './write';

const rootReducer = combineReducers({
  user,
  write,
});

export default rootReducer;
