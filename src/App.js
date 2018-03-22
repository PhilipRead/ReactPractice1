import React, { Component } from 'react';
import Square from './Square.js';
import './App.css';

class App extends Component {
  render() {
    let squareArr = [];
    for(let i = 0; i<16; i++) {
      squareArr.push(<Square key={i} squareState='empty'/>);
    }
    return (
      <div className="container">
        {squareArr}
      </div>
    );
  }
}

export default App;
