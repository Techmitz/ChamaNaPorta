import {
  MODIFY_EMAIL_PROFESSIONAL,
  MODIFY_NAME_PROFESSIONAL,
  MODIFY_PASSWORD_PROFESSIONAL
} from '../actions/actionTypes';

// Estado inicial
const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
};

// Reducer para usuário costumer
const userProfessionalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFY_NAME_PROFESSIONAL:
      return { ...state, name: action.payload };
    case MODIFY_EMAIL_PROFESSIONAL:
      return { ...state, email: action.payload };
    case MODIFY_PASSWORD_PROFESSIONAL:
      return { ...state, password: action.payload };

    default:
      return state;
  }
};

export default userProfessionalReducer;
