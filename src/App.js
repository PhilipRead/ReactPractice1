import React, { Component } from 'react';
import Board from './components/Board/Board.js';
import GameSelect from './components/GameSelect/GameSelect.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      gameStarted : false,
      gameSize : null
    }
  }

  render() {
    return this.state.gameStarted
      ? <Board gameSize={this.state.gameSize}/>
      : <GameSelect />
  }
}

export default App;
