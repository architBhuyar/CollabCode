import React from 'react';
import Avatar from 'react-avatar';
import Client from '../components/Client';

const Clients = ({userName}) => {

    return (
    <div className="client">
        <Avatar name={userName} size={50} round="16" /> 
        {/* install react-avatar */}
        <span className="userName"></span>
    </div>
  )
}

export default Clients