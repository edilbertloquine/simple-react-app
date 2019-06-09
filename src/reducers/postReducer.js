import {
  GET_POSTS,
  CLEAR_POSTS,
  POSTS_LOADING,
  CREATE_POST
} from '../actions/types';

const initialState = {
  post: null,
  posts: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: null
      };
    default:
      return state;
  }
};
