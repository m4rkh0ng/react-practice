import React from 'react';
import Note from './Note';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes : []
        }
    }

    nextId = () => {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++
    }

    // creating a function to add note which which also uses above function to keep track of numeric id
    // takes in text, but in this implementation, this doesn't, from the initialization of the note, allow us to type in the text prior to the new note being rendered; in order to make that possible, we would need to have a form along with the "+" button to actually save the text
    // let's go ahead and implement that below

    add = (text) => {
        let notes = [
            ...this.state.notes,
            {
                id: this.nextId(),
                note: text
            }
        ]
        this.setState({notes});
        document.getElementById('myText').value = '';
    }

    update = ( newText, id ) => {
        let notes = this.state.notes.map(note => (note.id !== id) 
            ? note 
            :   {
                    ...note,
                    note: newText
                }
        )
        this.setState({notes})
    } 

    remove = (id) => {
        let notes = this.state.notes.filter(note => note.id !== id)
        this.setState({notes})
    }

    eachNote = (note) => {
        return( <Note 
                    key={note.id}
                    id={note.id}
                    onChange={this.update}
                    onRemove={this.remove}
                    >{note.note}
                </Note> 
    )}

    
    // this implementation will always have the Sticky Note box on the screen and have it rendered at the top for new notes to be made
    // alternative solution could be: when adding a note, instead of generating a blank note to then which you have to push "Edit" to actually begin typing into, you can set editing to true when this.add() is pressed and this may be a preferred behavior (compared to always having an editable field open and active all of the time)
    render() {
        return(
            <div className="board">
                <div className="note">
                    <textarea className="editbox" id="myText"></textarea>
                    <button onClick={()=>this.add(document.getElementById('myText').value)}>+</button>
                </div>

                {this.state.notes.map(this.eachNote)}
            </div>
        )
    }
}

export default Board;