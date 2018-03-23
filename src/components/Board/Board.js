import React, { Component } from 'react';
import Square from '../Square/Square.js';
import './Board.css';

let boardClasses = {
    4 : 'four-by-four',
    6 : 'six-by-six',
    8 : 'eight-by-eight',
    10 : 'ten-by-ten',
    12 : 'twelve-by-twelve'
  }

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = { gameSize : props.gameSize };
    }

    render() {
        let gs = this.state.gameSize;
        let squareArr = [];
        for(let i = 0; i < (gs*gs); i++) {
          squareArr.push(<Square key={i} squareState='empty'/>);
        }
        return (
          <div className={`container ${boardClasses[gs]}`}>
            {squareArr}
          </div>
        );
    }
}

export default Board;