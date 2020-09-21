import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
        <Link to='/addFolder'>
          <li className='folder-li'>
            Add Folder
          </li>
        </Link>
      </ul>
    )
  }
}

export default SidebarMain;