import React from 'react';
import { NavLink } from 'react-router-dom';

class SidebarMain extends React.Component {
  render() {
    return (
      <ul className='sidebar'>
        {this.props.folders.map(folder => 
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