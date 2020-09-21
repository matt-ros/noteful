import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext';
import NoteListItem from '../NoteListItem/NoteListItem';
import './Main.css';

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
        <Link to='/addNote'>
          <li className='addNoteButton'>Add Note</li>
        </Link>
      </ul>
    )
  }
}

Main.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      folderId: PropTypes.string
    }).isRequired,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default Main;