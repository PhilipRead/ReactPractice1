import React, { Component } from 'react';
import './Square.css';

let nextSquareState = {
    'empty' : 'blue',
    'blue' : 'orange',
    'orange' : 'empty'
}

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {squareState: props.squareState}
    }

    handleClick = () => {
        this.setState(prevState => ({
            squareState: nextSquareState[prevState.squareState]
        }));
    }

    render() {
        return <div className={`square ${this.state.squareState}`} onClick={this.handleClick}></div>;
    }
}

export default Square;