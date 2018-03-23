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
  
let gameSize = 8;

class Board extends Component {
    render() {
        let squareArr = [];
        for(let i = 0; i<(gameSize*gameSize); i++) {
          squareArr.push(<Square key={i} squareState='empty'/>);
        }
        return (
          <div className={`container ${boardClasses[gameSize]}`}>
            {squareArr}
          </div>
        );
    }
}

export default Board;