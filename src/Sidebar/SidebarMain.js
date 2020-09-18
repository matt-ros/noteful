import React from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class SidebarMain extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { folders } = this.context
    return (
      <ul className='sidebar'>
        {folders.map(folder => 
          <NavLink key={folder.id} to={`/folder/${folder.id}`}>
            <li className='folder-li' key={folder.id}>
              {folder.name}
            </li>
          </NavLink>
        )}
      </ul>
    )
  }
}

export default SidebarMain;