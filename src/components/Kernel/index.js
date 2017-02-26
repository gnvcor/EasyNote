import React, { Component } from 'react';
import './index.css';

import FilterNote from '../FilterNote';
import ListNote from '../ListNote';
import FormAddNote from '../FormAddNote';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app__title">
            EasyNote
        </div>
        <div className="app__components">
            <FilterNote />
            <ListNote />
            <FormAddNote />
        </div>
      </div>
    );
  }
}

export default App;
