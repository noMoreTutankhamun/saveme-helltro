import { combineReducers } from 'redux';
import user from './user';
import write from './write';
import loading from './loading';

const rootReducer = combineReducers({
  user,
  loading,
  write,
});

export default rootReducer;
