import {
  SET_ROARS,
  LIKE_ROAR,
  UNLIKE_ROAR,
  LOADING_DATA,
  DELETE_ROAR,
  POST_ROAR,
  SET_ROAR,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  roars: [],
  roar: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_ROARS:
      return {
        ...state,
        roars: action.payload,
        loading: false
      };
    case SET_ROAR:
      return {
        ...state,
        roar: action.payload
      };
    case LIKE_ROAR:
    case UNLIKE_ROAR:
      let index = state.roars.findIndex(
        roar => roar.roarId === action.payload.roarId
      );
      state.roars[index] = action.payload;

      if (state.roar.roarId === action.payload.roarId) {
        let temp = state.roar.comments;
        state.roar = action.payload;
        state.roar.comments = temp;
      }

      return {
        ...state
      };
    case DELETE_ROAR:
      return {
        ...state,
        roars: state.roars.filter(roar => roar.roarId !== action.payload)
      };
    case POST_ROAR:
      return {
        ...state,
        roars: [action.payload, ...state.roars]
      };
    case SUBMIT_COMMENT:
      console.log('comment', action, state);
      return {
        ...state,
        roar: {
          ...state.roar,
          commentCount: state.roar.commentCount + 1,
          comments: [action.payload, ...state.roar.comments]
        }
      };
    default:
      return state;
  }
}
