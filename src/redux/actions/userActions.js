import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from '../types';

import axios from 'axios';

export const loginUser = (userData, history) => dispath => {
  dispath({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispath(getUserData());
      dispath({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      dispath({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signupUser = (newUser, history) => dispath => {
  dispath({ type: LOADING_UI });
  axios
    .post('/signup', newUser)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispath(getUserData());
      dispath({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      dispath({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispath => {
  localStorage.removeItem('FBidToken');
  delete axios.defaults.headers.common['Authorization'];
  dispath({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispath => {
  dispath({ type: LOADING_USER });
  axios
    .get('/user')
    .then(res => {
      console.log(res);
      dispath({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

const setAuthorizationHeader = token => {
  const FBidToken = `Bearer ${token}`;
  localStorage.setItem('FBidToken', FBidToken);
  axios.defaults.headers.common['Authorization'] = FBidToken;
};

export const uploadImage = formData => dispath => {
  dispath({ type: LOADING_USER });
  axios
    .post('/user/image', formData)
    .then(() => {
      dispath(getUserData());
    })
    .catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispath => {
  dispath({ type: LOADING_USER });
  axios
    .post('/user', userDetails)
    .then(() => {
      dispath(getUserData());
    })
    .catch(err => console.log(err));
};

export const markNotificationsRead = notificationIds => dispatch => {
  axios
    .post('/notifications', notificationIds)
    .then(res => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch(err => console.log(err));
};
