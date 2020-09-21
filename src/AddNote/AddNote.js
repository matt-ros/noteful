import React from 'react';
import PropTypes from 'prop-types';
import './AddNote.css';

class AddNote extends React.Component {
  state = {
    error: null
  }

  handleSubmit(e) {
    e.preventDefault();
    const { noteName, noteFolder, noteContent } = e.target;
    const note = {
      name: noteName.value.trim(),
      folderId: noteFolder.value,
      modified: new Date().toISOString(),
      content: noteContent.value
    };
    if (note.name.length === 0) {
      this.setState({ error: 'Please enter a name for your note.' });
      return;
    }
    this.setState({ error: null })

    fetch('http://localhost:9090/notes', {
      method: 'POST',
      body: JSON.stringify(note),
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
    .then(resJson => {
      this.props.history.goBack();
      this.props.onClickAdd(resJson);
    })
    .catch(error => {
      this.setState({ error: error.message });
    });
  }

  render() {
    const options = this.props.folders.map((folder, i) => (
      <option value={folder.id} key={i}>{folder.name}</option>
    ));

    return (
      <div className="add_note">
        <h2>Add Note</h2>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form_group">
            <label htmlFor="noteName">Note Name: </label>
            <input type="text" id="noteName" required />
          </div>
          <div className="form_group">
            <label htmlFor="noteFolder">Folder: </label>
            <select id="noteFolder">
              <option value='none'>Select a Folder...</option>
              {options}
            </select>
          </div>
          <div className="form_group">
            <label htmlFor="noteContent">Content: </label>
            <textarea id="noteContent" />
          </div>
          <div className="button_group">
            <button type="submit">Add Note</button>
          </div>
        </form>
      </div>
    )
  }
}

AddNote.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
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
  onClickAdd: PropTypes.func.isRequired
}

export default AddNote;