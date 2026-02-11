import { combineReducers } from 'redux';
import userCostumerReducer from './userCostumerReducer';
import userProfessionalReducer from './userProfessionalReducer';

// Combina todos os reducers da aplicação
const rootReducer = combineReducers({
  customer: userCostumerReducer,
  professional: userProfessionalReducer
});

export default rootReducer;
