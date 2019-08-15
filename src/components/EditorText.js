import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { addBoxInner } from '../actions/editor';


class EditorText extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      optionValue: 'Arial',
      inputValue: ''
    };
  }

  handleChangeOption(event) {
    this.setState({
      optionValue: event.target.value
    }); 
  }

  handleChangeText(event) {
    this.setState({ 
      inputValue: event.target.value
    });
  }

  handleAddText() {
    let inputValue = this.state.inputValue;
    let optionValue = this.state.optionValue;

    if (!inputValue.length) return

    this.props.onAdd('text', {
      text: inputValue,
      font: optionValue
    }, 0, 200);
    
    // reset input
    this.setState({ 
      inputValue: ''
    });
  }

  render() {
    const self = this;

    return (
      <div>
        <Typography variant="h6" gutterBottom style={{marginTop: 40}}>
          Add Text
        </Typography>
        <TextField
          label="Text"
          margin="normal"
          fullWidth
          value={self.state.inputValue}
          onChange={event => self.handleChangeText(event)}
          style={{marginBottom: 20}}
        />
        <br/>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="font-family"
            name="fonts"
            value={this.state.optionValue}
            onChange={event => self.handleChangeOption(event)}
          >
            <FormLabel component="legend">Font family</FormLabel>
            <FormControlLabel value="Arial" control={<Radio />} label="Arial" />
            <FormControlLabel value="Times New Roman" control={<Radio />} label="Times New Roman" />
            <FormControlLabel value="Open Sans" control={<Radio />} label="Open sans" />
          </RadioGroup>
        </FormControl>
        <Button onClick={event => this.handleAddText()} variant="contained" color="primary" style={{display: 'block'}}>
          Add text
        </Button>
      </div>
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onAdd: (type, content, left, top) => {
      dispatch(addBoxInner(type, content, left, top));
    }
  })
)(EditorText);