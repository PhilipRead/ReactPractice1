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
        let newBoard = [];
        for(var i = 0; i < this.gameSize; i++) {
          newBoard.push(Array.from(new Array(this.gameSize), () => 0));
        }
        this.state = { board: newBoard };
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
      if(!this.checkArrs(this.state.board)) {
        return false;
      }

      let transposed = Math.transpose(this.state.board);
      if(!this.checkArrs(transposed)) {
        return false;
      }

      return true;
    }
    
    updateBoard = (i, k, value) => {
      let curValue = this.state.board[i][k];
      if(curValue === value) {
        return;
      } else if (curValue === 0) {
        this.unmarkedSquares--;
      } else if (value === 0) {
        this.unmarkedSquares++;
      }

      this.setState(prevState => {
        prevState.board[i][k] = value;
        return prevState;
      });

      if(this.unmarkedSquares === 0) {
        console.log(this.checkIfSolved());
      }
    }

    fillTriples() {
      for(let i = 0; i < this.state.board.length; i++) {
        for(let k = 0; k < this.state.board.length; k++) {
          let squareVal = this.state.board[i][k];
          if(squareVal === 0) {
            this.unmarkedSquares--;
            this.setState(prevState => {
              let newValue = Math.randomInt(1,3);
              console.log(newValue);
              prevState.board[i][k] = newValue;
              return prevState;
            });
          }
        }
      }
    }

    solve = () => {
      while(this.unmarkedSquares > 0) {
        this.fillTriples();
      }
    }

    render() {
        let gs = this.gameSize;
        let squareArr = [];
        for(let i = 0; i < gs; i++) {
          for(let k = 0; k < gs; k++) {
            squareArr.push(<Square key={i*gs+k} row={i} col={k} squareState={this.state.board[i][k]} updateBoard={this.updateBoard} />);
          }
        }
        return (
          <div className={`container ${boardClasses[gs]}`}>
            {squareArr}
            <button onClick={this.solve}>Solve</button>
          </div>
        );
    }
}

export default Board;