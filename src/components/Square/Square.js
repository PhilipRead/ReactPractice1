import React, { Component } from 'react';
import './Square.css';

let stateToClass = {
    0 : 'empty',
    1 : 'orange',
    2 : 'blue'
};

let nextSquareState = {
    0 : 1,
    1 : 2,
    2 : 0
};

class Square extends Component {
    constructor(props) {
        super(props);
        this.row = props.row;
        this.col = props.col;
        this.updateBoard = props.updateBoard;
    }

    handleClick = () => this.updateBoard(this.row, this.col, nextSquareState[this.props.squareState]);

    render() {
        return <div className={`square ${stateToClass[this.props.squareState]}`} onClick={this.handleClick}></div>;
    }
}

export default Square;