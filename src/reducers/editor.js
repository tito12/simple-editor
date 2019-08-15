import {
  ADD_BOX_INNER,
  UPDATE_BOX_INNER,
  DELETE_BOX_INNER,
  UPDATE_BOX_INNER_SELECTED,
  FETCH_IMAGES
} from '../actions/editor';

export const editor = (state = [], action) => {
  switch (action.type) {
    case FETCH_IMAGES:
      return {
        ...state,
        images: action.images
      }
    case ADD_BOX_INNER:
      return {
        ...state,
        boxesInner: [...state.boxesInner ? state.boxesInner : [] , {
          id: action.data.id, 
          category: action.data.category, 
          left: action.data.left, 
          top: action.data.top,
          content: action.data.content
        }]
      }
    case DELETE_BOX_INNER:
      return {
        ...state,
        boxesInner: state.boxesInner.filter(item => item.id !== action.data.id),
        boxesInnerSelected: null
      }
    case UPDATE_BOX_INNER:
      let data;

      state.boxesInner.forEach((item, index) => {
        if (item.id !== action.data.id) {
          data =  {
            ...state,
            boxesInner: state.boxesInner
          }
        } else {
          data = {
            ...state,
            boxesInner: Object.assign(item, {
              id: action.data.id, 
              left: action.data.left, 
              top: action.data.top 
            })
          }
        }
        return data
      });
    case UPDATE_BOX_INNER_SELECTED:
      return {
        ...state,
        boxesInnerSelected: action.data.id
      }
    default:
      return state;
  }
}