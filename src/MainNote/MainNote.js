import React from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';

class MainNote extends React.Component {
  render() {
    return (
      <div className='main-area'>
        <NoteListItem note={this.props.note} />
        <p>{this.props.note.content}</p>
      </div>
    )
  }
}

export default MainNote;