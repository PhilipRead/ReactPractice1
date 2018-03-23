import React, { Component } from 'react';
import Square from '../Square/Square.js';
import './GameSelect.css';

class GameSelect extends Component {
    render() {
        let squareArr = [];
        for(let i = 0; i < 5; i++) {
          squareArr.push(<Square key={i} squareState='empty'/>);
        }
        return (
          <div className='container selections'>
            {squareArr}
          </div>
        );
    }
}

export default GameSelect;