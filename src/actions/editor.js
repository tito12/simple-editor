import axios from 'axios';

import { API } from '../api';

export const FETCH_IMAGES = 'FETCH_IMAGES';
export const ADD_BOX_INNER = 'ADD_BOX_INNER';
export const UPDATE_BOX_INNER = 'UPDATE_BOX_INNER';
export const DELETE_BOX_INNER = 'DELETE_BOX_INNER';
export const UPDATE_BOX_INNER_SELECTED = 'UPDATE_BOX_INNER_SELECTED';

let counterBoxInnerId = 0;

export const fetchImagesSuccess = images => {
  return {
    type: FETCH_IMAGES,
    images
  }
};

export const fetchAllImages = () => {
  return (dispatch) => {
    return axios.get(API.getPicsumImages)
      .then(response => {
        dispatch(fetchImagesSuccess(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const addBoxInnerSuccess = (id, category, content, left, top) => {
  return {
    type: ADD_BOX_INNER,
    data: {
      id,
      category,
      content,
      left,
      top
    }
  }
};

export const addBoxInner = (category, content, left, top) => {
  const id = counterBoxInnerId + 1;
  return (dispatch) => {
    dispatch(addBoxInnerSuccess(id, category, content, left, top))
    counterBoxInnerId = id;
  };
};

export const updateBoxInnerSuccess = (id, left, top) => {
  return {
    type: UPDATE_BOX_INNER,
    data: {
      id,
      left,
      top
    }
  }
};

export const updateBoxInner = (id, left, top) => {
  return (dispatch) => {
    dispatch(updateBoxInnerSuccess(id, left, top))
  };
};

export const deleteBoxInnerSuccess = (id) => {
  return {
    type: DELETE_BOX_INNER,
    data: {
      id
    }
  }
};

export const deleteBoxInner = (id) => {
  return (dispatch) => {
    dispatch(deleteBoxInnerSuccess(id))
  };
};

export const updateBoxInnerSelectedSuccess = (id) => {
  return {
    type: UPDATE_BOX_INNER_SELECTED,
    data: {
      id
    }
  }
};

export const updateBoxInnerSelected = (id) => {
  return (dispatch) => {
    dispatch(updateBoxInnerSelectedSuccess(id))
  };
};