import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext';

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

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
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
          {this.props.note.name}
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
    name: PropTypes.string.isRequired,
    modified: PropTypes.string,
    folderId: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  onDeleteNote: PropTypes.func.isRequired
}

export default NoteListItem;