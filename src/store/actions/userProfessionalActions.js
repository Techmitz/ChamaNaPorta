import {
  MODIFY_EMAIL_PROFESSIONAL,
  MODIFY_NAME_PROFESSIONAL,
  MODIFY_PASSWORD_PROFESSIONAL,
} from './actionTypes';

export const modifyName = name => dispatch => {
  dispatch({ type: MODIFY_NAME_PROFESSIONAL, payload: name });
};

export const modifyEmail = email => dispatch => {
  dispatch({ type: MODIFY_EMAIL_PROFESSIONAL, payload: email });
};

export const modifyPassword = password => dispatch => {
  dispatch({ type: MODIFY_PASSWORD_PROFESSIONAL, payload: password });
};

