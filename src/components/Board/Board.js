import React, { Component } from 'react';
import Square from '../Square/Square.js';
import './Board.css';
import Math from 'mathjs';

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

    verifyArr(arr) {
      let count = 0;
      let lookBackType = 0;
      let lookBackNum = 0;
      for(let squareVal of arr) {
        if(squareVal === 1) {
          count++;
        } else {
          count--;
        }

        if(lookBackType === squareVal) {
          if(lookBackNum === 2) {
            return false;
          }
          lookBackNum++;
        } else {
          lookBackType = squareVal;
          lookBackNum = 1;
        }
      }

      return count === 0;
    }

    equalArrs(arr1, arr2) {
      for(let i = 0; i < arr1.length; i++) {
        if(arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    }

    checkArrs(arrs) {
      for(let i = 0; i < arrs.length; i++) {
        let nextArr = arrs[i];
        if(!this.verifyArr(nextArr)) {
          return false;
        }

        for(let k = i + 1; k < arrs.length; k++) {
          if(this.equalArrs(nextArr, arrs[k])) {
            return false;
          }
        }
      }
      return true;
    }

    checkIfSolved() {
      if(!this.checkArrs(this.board)) {
        return false;
      }

      let transposed = Math.transpose(this.board);
      if(!this.checkArrs(transposed)) {
        return false;
      }

      return true;
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

      if(this.unmarkedSquares === 0) {
        console.log(this.checkIfSolved());
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