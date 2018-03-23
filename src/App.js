import React, { Component } from 'react';
import Board from './components/Board/Board.js';
import './App.css';

class App extends Component {
  render() {
    return <Board gameSize='12'/>
  }
}

export default App;
