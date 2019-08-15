import React, { Component } from 'react';

import Editor from './Editor';

const style = {
  margin: '50px auto 0 auto',
  width: '1200px',
}

export default class App extends Component {
  render() {
    return (
      <div style={style}>
        <Editor />
      </div>
    )
  }
}