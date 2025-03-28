import * as authApi from '../../api';
import actionTypes from './actionTypes';


// Action Creators
export const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST
});

export const loginSuccess = (userData) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: userData
});

export const loginFailure = (error) => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: error
});

export const logoutAction = () => ({
  type: actionTypes.LOGOUT
});

export const checkAuthStatusAction = (authStatus) => ({
  type: actionTypes.CHECK_AUTH_STATUS,
  payload: authStatus
});

export const registerRequest = () => ({
  type: actionTypes.REGISTER_REQUEST
});

export const registerSuccess = (userData) => ({
  type: actionTypes.REGISTER_SUCCESS,
  payload: userData
});

export const registerFailure = (error) => ({
  type: actionTypes.REGISTER_FAILURE,
  payload: error
});

// Thunk Actions
export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await authApi.login(credentials);
      
      // Save user data and token in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      dispatch(loginSuccess(response.user));
      return response.user;
    } catch (error) {

      let errorMessage = 'Login failed. Please try again.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response && error.response.data) {
        errorMessage = error.response.data.message || 'Server error. Please try again.';
      }
      
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    authApi.logout();
    dispatch(logoutAction());
  };
};

export const checkAuthStatus = () => {
  return (dispatch) => {
    try {
      const status = authApi.checkAuthStatus();
      
      if (status && typeof status.isAuthenticated !== 'undefined') {
        dispatch(checkAuthStatusAction(status));
      } else {
        dispatch(checkAuthStatusAction({ isAuthenticated: false, user: null }));
      }
      
      return status;
    } catch (error) {
      console.error('Error checking auth status:', error);
      const status = { isAuthenticated: false, user: null };
      dispatch(checkAuthStatusAction(status));
      return status;
    }
  };
};

export const register = (userData) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await authApi.register(userData);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      dispatch(registerSuccess(response.user));
      return response.user;
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response && error.response.data) {
        errorMessage = error.response.data.message || 'Server error. Please try again.';
      }
      
      dispatch(registerFailure(errorMessage));
      throw error;
    }
  };
}; 