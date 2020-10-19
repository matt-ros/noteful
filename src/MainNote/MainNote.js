import React from 'react';
import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext';
import NoteListItem from '../NoteListItem/NoteListItem';
import './MainNote.css';

class MainNote extends React.Component {
  static contextType = NotefulContext;

  onDeleteNote = () => {
    this.props.history.push('/')
  }

  render() {
    const note = this.context.notes.find(note => (
      note.id == this.props.match.params.noteId
    ))
    return (
      <div className='main-area'>
        <NoteListItem note={note} onDeleteNote={this.onDeleteNote} />
        <p>{note.content}</p>
      </div>
    )
  }
}

MainNote.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func.isRequired,
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

export default MainNote;