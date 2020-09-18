import React from 'react';
import NotefulContext from '../NotefulContext';

class SidebarNote extends React.Component {
  static contextType = NotefulContext;
  
  getFolderfromNote(noteId) {
    const note = this.context.notes.find(note =>
      note.id === noteId
    );
    const folder = this.context.folders.find(folder =>
      folder.id === note.folderId
    );
    return folder;
  }

  render() {
    const folder = this.getFolderfromNote(this.props.match.params.noteId)
    return (
      <div className='sidebar'>
        <ul>
          <li onClick={e => this.props.history.goBack()}>Go Back</li>
        </ul>
        <h2>{folder.name}</h2>
      </div>
    )
  }
}

export default SidebarNote;