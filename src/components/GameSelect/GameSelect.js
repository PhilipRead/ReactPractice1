import React, { Component } from 'react';
import Selection from '../Selection/Selection.js';
import Board from '../Board/Board.js';
import './GameSelect.css';

class GameSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      gameStarted : false,
      gameSize : null
    }
  }

  handleSelection = (gameSize) => {
    let func = () => {
      this.setState({
        gameStarted : true,
        gameSize : gameSize
      });
    };
    return func;
  }

  render() {
    if(this.state.gameStarted) {
      return <Board gameSize={this.state.gameSize} />
    }

    let selectionArr = [];
    for(let i = 0; i < 5; i++) {
      let gs = (i+2)*2;
      selectionArr.push(<Selection key={i} size={gs} handleSelection={this.handleSelection(gs)}/>);
    }
    return (
      <div className='container selections'>
        {selectionArr}
      </div>
    );
  }
}

export default GameSelect;