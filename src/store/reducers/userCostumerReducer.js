import {
  MODIFY_EMAIL_COSTUMER,
  MODIFY_PASSWORD_COSTUMER
} from '../actions/actionTypes';

// Estado inicial
const INITIAL_STATE = {
  email: '',
  password: ''
};

// Reducer para endereço
const userCostumerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFY_EMAIL_COSTUMER:
      return { ...state, email: action.payload };
    case MODIFY_PASSWORD_COSTUMER:
      return { ...state, password: action.payload };

    default:
      return state;
  }
};

export default userCostumerReducer;
