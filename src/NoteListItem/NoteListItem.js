import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext';
import './NoteListItem.css';

class NoteListItem extends React.Component {
  state = {
    error: null
  }
  static defaultProps = {
    onDeleteNote: () => {}
  }
  static contextType = NotefulContext;

  handleDelete(noteId, callback) {
    this.setState({ error: null });

    fetch(`http://localhost:8000/api/notes/${noteId}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res;
    })
    .then(data => {
      this.props.onDeleteNote();
      callback(noteId);
    })
    .catch(error => {
      this.setState({ error: error.message });
    })
  }

  render() {
    const date = (new Date(this.props.note.modified)).toDateString();
    return (
      <li>
        {this.state.error && <p>{this.state.error}</p>}
        <Link className='note-link' to={`/note/${this.props.note.id}`}>
          {this.props.note.note_name}
        </Link>
        <p className='note-info'>
          Date modified: {date}
          <button
            onClick={() => {
              this.handleDelete(
                this.props.note.id,
                this.context.deleteNote
              )
            }}
          >
            Delete Note
          </button>
        </p>
      </li>
    );
  }
}

NoteListItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    note_name: PropTypes.string.isRequired,
    modified: PropTypes.string,
    folder_id: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  onDeleteNote: PropTypes.func.isRequired
}

export default NoteListItem;