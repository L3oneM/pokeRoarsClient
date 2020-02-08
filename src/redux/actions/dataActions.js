import {
  SET_ROARS,
  LOADING_DATA,
  LIKE_ROAR,
  UNLIKE_ROAR,
  SET_ERRORS,
  DELETE_ROAR,
  LOADING_UI,
  CLEAR_ERRORS,
  POST_ROAR,
  SET_ROAR,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

export const getRoars = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/roars')
    .then(res => {
      dispatch({
        type: SET_ROARS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: []
      });
    });
};

export const getRoar = roarId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/roar/${roarId}`)
    .then(res => {
      dispatch({
        type: SET_ROAR,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

export const postRoar = newRoar => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/roar`, newRoar)
    .then(res => {
      dispatch({
        type: POST_ROAR,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const likeRoar = roarId => dispatch => {
  axios
    .get(`/roar/${roarId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_ROAR,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const unlikeRoar = roarId => dispatch => {
  axios
    .get(`/roar/${roarId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_ROAR,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const submitComment = (roarId, commentData) => dispatch => {
  axios
    .post(`/roar/${roarId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteRoar = roarId => dispatch => {
  axios
    .delete(`/roar/${roarId}`)
    .then(() => {
      dispatch({
        type: DELETE_ROAR,
        payload: roarId
      });
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_ROARS,
        payload: res.data.roars
      });
    })
    .catch(() => {
      dispatch({
        type: SET_ROARS,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
