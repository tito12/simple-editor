import React from 'react'
import { useDrag } from 'react-dnd'

const style = {
  padding: '0.5rem 1rem',
  marginRight: '0.5rem',
  border: '1px dashed gray',
  cursor: 'move',
  width: '50px',
  display: 'inline-block'
}

const Box = ({ content, category }) => {

  const [{ isDragging }, drag] = useDrag({
    item: { content, category: category, type: 'box' },
  })

  return (
    <img src={content.url} ref={drag} style={style} alt="Box" />
  )
}

export default Box