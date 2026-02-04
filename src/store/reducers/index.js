import { combineReducers } from 'redux';
import userCostumerReducer from './userCostumerReducer';

// Combina todos os reducers da aplicação
const rootReducer = combineReducers({
  userCostumerReducer,
});

export default rootReducer;
