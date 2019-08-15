import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { deleteBoxInner } from '../actions/editor';
import { API } from '../api';

import EditorCanvas from './EditorCanvas.js';
import EditorText from './EditorText.js';
import Box from './Box.js';

const styles = {
  thumbnail: {
    width: '100px',
    height: '100px',
    marginBottom: '5px',
    cursor: 'pointer'
  }
};

class Editor extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      clickedImg: '',
      optionValue: 'Arial'
    };
  }

  handleChooseImage(src) {
    this.setState({
      clickedImg: src
    }); 
  }

  handleRemoveImage() {
    this.setState({
      clickedImg: ''
    });
  }

  handleRemoveSelected() {
    const id = this.props.store.boxesInnerSelected;
    this.props.onDeleteSelected(id);
  }

  renderImages() {
    let images = this.props.store.images;

    if(!images) return

    return images.map((item, i) => {
      let srcThumbnail = `${API.getPicsumImageById}/${item.id}/100`;
      let srcImage = `${API.getPicsumImageById}/${item.id}/400`;
        
      return <CardMedia
          key={i}
          style={styles.thumbnail}
          image={srcThumbnail}
          onClick={event => this.handleChooseImage(srcImage)}
        />
    });
  }

  render() {
    const self = this;
    const { boxesInnerSelected } = this.props.store;

    return (
      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="h6" gutterBottom>
              Select Background
            </Typography>
            {self.renderImages()}
            {self.state.clickedImg &&
              <Button onClick={event => this.handleRemoveImage()} variant="contained" color="secondary">
                Delete background
              </Button>
            }
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" gutterBottom>
              Simple Editor
            </Typography>
            <EditorCanvas {...self.state} />
            {boxesInnerSelected && boxesInnerSelected !== null &&
              <Button onClick={event => this.handleRemoveSelected()} variant="contained" color="secondary">
               Delete last clicked
              </Button>
            }
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom>
              Add Logo
            </Typography>
            <Box category="image" content={{url: "images/logo_one.png"}}/>
            <Box category="image" content={{url: "images/logo_two.png"}}/>
            <Box category="image" content={{url: "images/logo_three.png"}}/>
            <EditorText />
          </Grid>
        </Grid>
      </DndProvider>
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onDeleteSelected: (id) => {
      dispatch(deleteBoxInner(id));
    }
  })
)(Editor);