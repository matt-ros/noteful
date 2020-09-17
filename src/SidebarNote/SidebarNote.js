import React from 'react';

class SidebarNote extends React.Component {
  render() {
    return (
      <div className='sidebar'>
        <ul>
          <li onClick={e => this.props.history.goBack()}>Go Back</li>
        </ul>
        <h2>{this.props.folder.name}</h2>
      </div>
    )
  }
}

export default SidebarNote;