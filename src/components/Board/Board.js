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
        let newBoard = prevState.board;
        newBoard[i][k] = value;
        return {board: newBoard};
      });

      if(this.unmarkedSquares === 0) {
        console.log(this.checkIfSolved());
      }
    }

    isDouble(i1, k1, i2, k2) {
      if([i1, k1, i2, k2].some(val => val < 0 || val >= this.gameSize)) {
        return 0;
      }
      let val1 = this.tempBoard[i1][k1];
      let val2 = this.tempBoard[i2][k2];
      return val1 === val2 ? val1 : 0;
    }

    fillTriples() {
      let foundDouble = true;
      while(foundDouble) {
        foundDouble = false;
        for(let i = 0; i < this.tempBoard.length; i++) {
          for(let k = 0; k < this.tempBoard.length; k++) {
            let squareVal = this.tempBoard[i][k];
            if(squareVal !== 0) {
              continue;
            }
            let doubleCordss = [ 
              [i, k-1, i, k-2], //left double
              [i-1, k, i-2, k], //up double 
              [i, k+1, i, k+2], //right double
              [i+1, k, i+2, k], //bottom double
              [i, k-1, i, k+1], //horiz cross double
              [i-1, k, i+1, k]  //verti cross double
            ];
            for(let doubleCords of doubleCordss) {
              let doubleVal = this.isDouble(...doubleCords);
              if(doubleVal > 0) {
                foundDouble = true;
                this.tempBoard[i][k] = doubleVal === 2 ? 1 : 2;
                this.unmarkedSquares--;
                this.moves.push({i:i, k:k, value:this.tempBoard[i][k]});
                break;
              }
            }
          }
        }
      }
    }

    solve = () => {
      this.tempBoard = []
      for(let row of this.state.board) {
        this.tempBoard.push([...row]);
      }
      this.moves = [];
      this.fillTriples();
      let nextMove = move => {
        if(move === undefined) {
          return;
        }
        this.setState(prevState => {
          let newBoard = prevState.board;
          newBoard[move.i][move.k] = move.value;
          return {board: newBoard};
        }, () => setTimeout(() => nextMove(this.moves.shift()), 500));
      };
      nextMove(this.moves.shift());
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