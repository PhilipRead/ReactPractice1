import React, { Component } from 'react';
import './Selection.css';

class Selection extends Component {
    constructor(props) {
        super(props);
        this.size = props.size;
        this.handleSelection = props.handleSelection;
    }

    render() {
        return <div className='selection-box' onClick={this.handleSelection}>{this.size}</div>
    }
}

export default Selection;