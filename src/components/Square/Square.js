import React, { Component } from 'react';
import './Square.css';

let nextSquareState = {
    'empty' : 'orange',
    'orange' : 'blue',
    'blue' : 'empty'
};

let stateToValue = {
    'empty' : 0,
    'orange' : 1,
    'blue' : 2
};

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = { squareState: props.squareState }
        this.row = props.row;
        this.col = props.col;
        this.updateBoard = props.updateBoard;
    }

    handleClick = () => {
        let newSquareState = nextSquareState[this.state.squareState];
        this.setState({
            squareState: newSquareState
        });
        this.updateBoard(this.row, this.col, stateToValue[newSquareState]);
    }

    render() {
        return <div className={`square ${this.state.squareState}`} onClick={this.handleClick}></div>;
    }
}

export default Square;