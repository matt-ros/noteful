import React from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';

class Main extends React.Component {
  render() {
    return (
      <ul className='main-area'>
        {this.props.notes.map(note => 
          <NoteListItem key={note.id} note={note} />
        )}
      </ul>
    )
  }
}

export default Main;