import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import SidebarMain from './Sidebar/SidebarMain';
import SidebarNote from './SidebarNote/SidebarNote'
import Main from './Main/Main';
import MainNote from './MainNote/MainNote';
import NotefulContext from './NotefulContext';

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: null
  }

  setFolders = folders => {
    this.setState({
      folders,
      error: null
    })
  }

  setNotes = notes => {
    this.setState({
      notes,
      error: null
    })
  }

  handleDeleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => (
      note.id !== noteId
    ));
    this.setState({
      notes: newNotes
    });
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(this.setFolders)
      .catch(err => {
        this.setState({
          error: err.message
        })
      });

      fetch('http://localhost:9090/notes')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(this.setNotes)
      .catch(err => {
        this.setState({
          error: err.message
        })
      });
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote
    }
    return (
      <div className='App'>
        <Header />
        {this.state.error && <p>{this.state.error}</p>}
        <main className='group'>
          <NotefulContext.Provider value={contextValue}>
            <Route
              exact path={['/', '/folder/:folderId']}
              component={SidebarMain}
            />
            <Route
              path={'/note/:noteId'}
              component={SidebarNote}
            />
            <Route
              exact path={'/'}
              component={Main}
            />
            <Route
              path={'/folder/:folderId'}
              component={Main}
            />
            <Route
              path={'/note/:noteId'}
              component={MainNote}
            />
          </NotefulContext.Provider>
        </main>
      </div>
    );
  }
}

export default App;