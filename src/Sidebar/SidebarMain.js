import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './SidebarMain.css';

class SidebarMain extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { folders } = this.context
    return (
      <ul className='sidebar'>
        {folders.map(folder => 
          <li className='folder-li' key={folder.id}>
            <NavLink key={folder.id} to={`/folder/${folder.id}`}>
              {folder.name}
            </NavLink>
          </li>
        )}
        <li className='folder-li'>
          <Link to='/addFolder'>
            Add Folder
          </Link>
        </li>
      </ul>
    )
  }
}

export default SidebarMain;