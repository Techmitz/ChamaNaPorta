import {
  MODIFY_EMAIL_COSTUMER,
  MODIFY_NAME_COSTUMER,
  MODIFY_PASSWORD_COSTUMER
} from '../actions/actionTypes';

// Estado inicial
const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
};

// Reducer para usuário costumer
const userCostumerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFY_NAME_COSTUMER:
      return { ...state, name: action.payload };
    case MODIFY_EMAIL_COSTUMER:
      return { ...state, email: action.payload };
    case MODIFY_PASSWORD_COSTUMER:
      return { ...state, password: action.payload };

    default:
      return state;
  }
};

export default userCostumerReducer;
