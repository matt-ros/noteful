import React from 'react';
import { Link } from 'react-router-dom';

class NoteListItem extends React.Component {
  render() {
    const date = (new Date(this.props.note.modified)).toDateString();
    return (
      <li>
        <Link className='note-link' to={`/note/${this.props.note.id}`}>
          {this.props.note.name}
        </Link>
        <p className='note-info'>
          Date modified: {date}
          <button>Delete Note</button>
        </p>
      </li>
    );
  }
}

export default NoteListItem;