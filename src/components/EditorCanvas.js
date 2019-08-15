import React from 'react'
import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';

import {
  addBoxInner,
  updateBoxInner,
  updateBoxInnerSelected
} from '../actions/editor';

import BoxInner from './BoxInner.js';

const style = {
  position: 'relative',
  overflow: 'hidden',
  width: '400px',
  height: '400px',
  border: '1px solid gray'
}

const EditorCanvas = (props) => {

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ['box', 'boxInner'],
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);

      if(item.type === 'boxInner') {
        moveBox(item.id, left, top);
      }

      if(item.type === 'box') {
        props.onAdd(item.category, item.content, 0, 0);
      }

      // reset after drag
      props.onSetSelected(null);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  });

  const moveBox = (id, left, top) => {
    props.onUpdate(id, left, top);
  };

  const handleSetSelected = (id) => {
    props.onSetSelected(id);
  };

  const isActive = canDrop && isOver;
  const boxesInner = props.store.boxesInner ? props.store.boxesInner : [];
  const imageEditorDefault = 'images/empty_background.bmp';

  const styleEditor = {
    ...style,
    backgroundImage: `url(${props.clickedImg ? props.clickedImg : imageEditorDefault})`
  };

  return (
    <div>
      <div ref={drop} style={styleEditor}>
        {boxesInner.map((item, i) => (
          <BoxInner
            key={i}
            id={item.id}
            hideSourceOnDrag={true}
            left={item.left}
            top={item.top}
            content={item.content}
            category={item.category}
            handle={handleSetSelected}
          />
        ))}
      </div>
      {isActive ? 'Release to drop' : 'Drag a logo here'}
    </div>
  )
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onAdd: (type, content, left, top) => {
      dispatch(addBoxInner(type, content, left, top));
    },
    onUpdate: (id, left, top) => {
      dispatch(updateBoxInner(id, left, top));
    },
    onSetSelected: (id) => {
      dispatch(updateBoxInnerSelected(id));
    }
  })
)(EditorCanvas);