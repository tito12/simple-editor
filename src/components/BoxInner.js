import React from 'react';
import { useDrag } from 'react-dnd';

const style = {
  position: 'absolute',
  cursor: 'move'
};

const BoxInner = ({ id, left, top, hideSourceOnDrag, content, category, handle }) => {
  
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: 'boxInner' },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  })

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }

  return (
    <div ref={drag} onClick={event => handle(id)} style={{ ...style, left, top }}>
      {category === 'image' &&
        <img src={content.url} style={{width: '100px', height: '100px'}} alt="Box inner" />
      }
      {category === 'text' &&
        <div style={{fontSize: '20px', width: '100%', textAlign: 'center', fontFamily: content.font}}>
          {content.text}
        </div>
      }
    </div>
  )
}

export default BoxInner