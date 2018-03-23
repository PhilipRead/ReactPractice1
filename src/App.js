import React, { Component } from 'react';
import Square from './components/Square/Square.js';
import './App.css';

let boardClasses = {
  4 : 'four-by-four',
  6 : 'six-by-six',
  8 : 'eight-by-eight',
  10 : 'ten-by-ten',
  12 : 'twelve-by-twelve'
}

let gameSize = 12;

class App extends Component {
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

export default App;
