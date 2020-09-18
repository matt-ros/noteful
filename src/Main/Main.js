import React from 'react';
import NotefulContext from '../NotefulContext';
import NoteListItem from '../NoteListItem/NoteListItem';

class Main extends React.Component {
  static contextType = NotefulContext;

  render() {
    let { notes } = this.context
    notes = ((this.props.match.params.folderId)
      ? notes.filter(note => note.folderId === this.props.match.params.folderId)
      : notes
    )

    return (
      <ul className='main-area'>
        {notes.map(note => 
          <NoteListItem key={note.id} note={note} />
        )}
      </ul>
    )
  }
}

export default Main;