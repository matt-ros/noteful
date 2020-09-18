import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class NoteListItem extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {}
  }
  static contextType = NotefulContext;

  handleDelete(noteId, callback) {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      this.props.onDeleteNote()
      callback(noteId)
    })
    .catch(error => {
      console.error(error);
    })
  }

  render() {
    const date = (new Date(this.props.note.modified)).toDateString();
    return (
      <li>
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

export default NoteListItem;