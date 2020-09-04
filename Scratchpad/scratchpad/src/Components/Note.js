import React from 'react';
import Draggable from 'react-draggable';

class Note extends React.Component {
            
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }

    componentWillMount = () => {
        this.style = {
            right: this.randomBetween( 0, window.innerWidth - 150, 'px'),
            top: this.randomBetween( 0, window.innerHeight - 150, 'px')
        }
    }
    randomBetween = ( x, y, s ) => {
        return ( x + Math.ceil(Math.random() * (y-x))) + s
    }

    edit = () => {
        this.setState( {editing: true} )
    }

    save = () => {
        this.props.onChange(this.refs.newText.value, this.props.id)
        this.setState({editing: false})
    }

    delete = (id) => {
        this.props.onRemove(this.props.id)
    }

    renderForm = () => {
        return(
            <div className="note" style={this.style}>
                <textarea class="editbox" ref="newText"></textarea>
                <button onClick={this.save}>Save</button>
            </div>
        )
    }

    renderDisplay = () => {
        return(
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}>Edit</button>
                    <button onClick={this.delete}>X</button>
                </span>   
            </div>
        )
    }

    render() {
        return(<Draggable>{
            (this.state.editing) ? this.renderForm() : this.renderDisplay()
        }</Draggable>)
    }
}

export default Note