import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import dataReducer from './dataReducer';

export default combineReducers({
  data: dataReducer,
  routing: routerReducer,
});
