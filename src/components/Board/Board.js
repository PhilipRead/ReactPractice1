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
        this.gameSize = props.gameSize;
        this.unmarkedSquares = this.gameSize * this.gameSize;
        this.board = [];
    }

    checkIfSolved() {
      console.log('checking if solved');
    }
    
    updateBoard = (i, k, value) => {
      let curValue = this.board[i][k];
      if(curValue === value) {
        return;
      } else if (curValue === 0) {
        this.unmarkedSquares--;
      } else if (value === 0) {
        this.unmarkedSquares++;
      }

      this.board[i][k] = value;

      console.log(this.unmarkedSquares);

      if(this.unmarkedSquares === 0) {
        this.checkIfSolved();
      }
    }

    render() {
        let gs = this.gameSize;
        let squareArr = [];
        for(let i = 0; i < gs; i++) {
         let newRow = [];
          for(let k = 0; k < gs; k++) {
            newRow.push(0);
            squareArr.push(<Square key={i*gs+k} row={i} col={k} squareState='empty' updateBoard={this.updateBoard} />);
          }
          this.board.push(newRow);
        }
        return (
          <div className={`container ${boardClasses[gs]}`}>
            {squareArr}
          </div>
        );
    }
}

export default Board;