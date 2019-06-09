import axios from 'axios';

import {
  GET_POST,
  GET_POSTS,
  POSTS_LOADING,
  CLEAR_POSTS,
  GET_ERRORS
} from '../actions/types';

export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('http://localhost:5000/api/posts')
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: {} }));
};

export const getPost = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('http://localhost:5000/api/posts')
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: {} }));
};

export const createPost = (newPost, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/posts/create', newPost)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const deletePost = id => dispatch => {
  if (window.confirm('Are you sure')) {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`)
      .then(res => console.log(res.data))
      .catch(err => dispatch({ type: GET_POSTS, payload: err.response.data }));
  }
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  };
};
