import React from 'react';
import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext';

class SidebarNote extends React.Component {
  static contextType = NotefulContext;
  
  getFolderfromNote(noteId) {
    const note = this.context.notes.find(note =>
      note.id === noteId
    );
    if (note.folderId === 'none') {
      return 'No Folder';
    }
    const folder = this.context.folders.find(folder =>
      folder.id === note.folderId
    );
    return folder.name;
  }

  render() {
    const folder = this.getFolderfromNote(this.props.match.params.noteId)
    return (
      <div className='sidebar'>
        <ul>
          <li onClick={e => this.props.history.goBack()}>Go Back</li>
        </ul>
        <h2>{folder}</h2>
      </div>
    )
  }
}

SidebarNote.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func
  }).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired
    }).isRequired,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default SidebarNote;