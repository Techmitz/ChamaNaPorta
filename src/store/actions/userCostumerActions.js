import {
  MODIFY_EMAIL_COSTUMER,
  MODIFY_NAME_COSTUMER,
  MODIFY_PASSWORD_COSTUMER,
} from './actionTypes';

export const modifyName = name => dispatch => {
  dispatch({ type: MODIFY_NAME_COSTUMER, payload: name });
};

export const modifyEmail = email => dispatch => {
  dispatch({ type: MODIFY_EMAIL_COSTUMER, payload: email });
};

export const modifyPassword = password => dispatch => {
  dispatch({ type: MODIFY_PASSWORD_COSTUMER, payload: password });
};

