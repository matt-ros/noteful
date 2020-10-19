import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import SidebarMain from './Sidebar/SidebarMain';
import SidebarNote from './SidebarNote/SidebarNote'
import Main from './Main/Main';
import MainNote from './MainNote/MainNote';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import './App.css';

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

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/folders')
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

      fetch('http://localhost:8000/api/notes')
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
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
        {this.state.error && <p>{this.state.error}</p>}
        <ErrorBoundary>
          <Route
            path={'/addFolder'}
            render={({ history }) => {
              return <AddFolder
                history={history}
                onClickAdd={this.handleAddFolder}
              />
            }}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <Route
            path={'/addNote'}
            render={({ history }) => {
              return <AddNote
                history={history}
                folders={this.state.folders}
                onClickAdd={this.handleAddNote}
              />
            }}
          />
        </ErrorBoundary>
        <main className='group'>
          <NotefulContext.Provider value={contextValue}>
            <ErrorBoundary>
              <Route
                exact path={['/', '/folder/:folderId']}
                component={SidebarMain}
              />
              <Route
                path={'/note/:noteId'}
                component={SidebarNote}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <Route
                exact path={['/', '/folder/:folderId']}
                component={Main}
              />
              <Route
                path={'/note/:noteId'}
                component={MainNote}
              />
            </ErrorBoundary>
          </NotefulContext.Provider>
        </main>
      </div>
    );
  }
}

export default App;