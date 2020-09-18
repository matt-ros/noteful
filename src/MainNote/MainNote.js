import React from 'react';
import NotefulContext from '../NotefulContext';
import NoteListItem from '../NoteListItem/NoteListItem';

class MainNote extends React.Component {
  static contextType = NotefulContext;

  onDeleteNote = noteId => {
    this.props.history.push('/')
  }

  render() {
    const note = this.context.notes.find(note => (
      note.id === this.props.match.params.noteId
    ))
    return (
      <div className='main-area'>
        <NoteListItem note={note} onDeleteNote={this.onDeleteNote} />
        <p>{note.content}</p>
      </div>
    )
  }
}

export default MainNote;