import React from 'react';
import PropTypes from 'prop-types';
import './AddFolder.css';


class AddFolder extends React.Component {
  state = {
    error: null
  }

  handleSubmit(event) {
    event.preventDefault();
    const folder = {};
    folder.name = event.target.folderName.value.trim();
    if (folder.name.length === 0) {
      this.setState({ error: 'Please enter a name for your folder.' });
      return;
    }
    this.setState({ error: null });

    fetch('http://localhost:9090/folders', {
      method: 'POST',
      body: JSON.stringify(folder),
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
    return (
      <div className="add_folder">
        <h2>Add Folder</h2>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="folderName">Folder Name: </label>
          <input type="text" id="folderName" required />
          <button type="submit">Add Folder</button>
        </form>
      </div>
    )
  }
}

AddFolder.propTypes = {
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

export default AddFolder;