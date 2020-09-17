import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import SidebarMain from './Sidebar/SidebarMain';
import SidebarNote from './SidebarNote/SidebarNote'
import Main from './Main/Main';
import MainNote from './MainNote/MainNote';
import STORE from './dummy-store';

class App extends React.Component {
  state = {
    folders: STORE.folders,
    notes: STORE.notes
  }

  getFolderfromNote(noteId) {
    const note = this.state.notes.find(note =>
      note.id === noteId
    );
    const folder = this.state.folders.find(folder =>
      folder.id === note.folderId
    );
    return folder;
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <main className='group'>
          <Route
            exact path={['/', '/folder/:folderId']}
            render={() =>
              <SidebarMain
                folders={this.state.folders}
              />
            }
          />
          <Route
            path={'/note/:noteId'}
            render={(routerProps) =>
              <SidebarNote
                folder={this.getFolderfromNote(routerProps.match.params.noteId)}
                history={routerProps.history}
              />
            }
          />
          <Route
            exact path={'/'}
            render={() => 
              <Main
                notes={this.state.notes}
              />
            }
          />
          <Route
            path={'/folder/:folderId'}
            render={(routerProps) =>
              <Main
                notes={this.state.notes.filter(note =>
                  note.folderId === routerProps.match.params.folderId
                )}
              />
            }
          />
          <Route
            path={'/note/:noteId'}
            render={(routerProps) =>
              <MainNote
                note={this.state.notes.find(note =>
                  note.id === routerProps.match.params.noteId
                )}
              />
            }
          />
        </main>
      </div>
    );
  }
}

export default App;