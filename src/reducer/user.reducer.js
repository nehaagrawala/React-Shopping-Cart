import { userConstants } from '../constant/constant';

let user = localStorage.getItem('user');
const initialState = user ? { loggingIn: user.length > 0, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: false,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingIn: false,
        user: action.user
      };
    case userConstants.LOGOUT:
      return { loggingIn: false,
        user: ''};
    default:
      return state
  }
}