import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';

const EditorPage = () => {

  const socketRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  
  const reactNavigator = useNavigate();

  const [clients, setClients] = useState([]); 

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log('socket error', err);
        toast.error('Socket connection failed, try again later ');
        reactNavigator('/');
      };

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,

      });

      // Listening for joined event
      socketRef.current.on(ACTIONS.JOINED,({clients,userName,socketId}
      ) =>{
        if(userName !== location.state?.userName){
          toast.success(`${userName} joined the room !!!`);
        }
        setClients(clients);
      });

      //Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED,({userName,socketId})=>{
          toast.success(`${userName} left the room !!!`);
          setClients((prev)=>{
            return prev.filter((client) =>     
               client.socketId !== socketId
            );
          });
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    }
  }, []);

 

  if (!location.state) {
    return <Navigate to='/' />;

  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/code-collab.png" alt="logo" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {
              clients.map(client => (
                <Client
                  key={client.socketId}
                  userName={client.userName} />
              ))}
          </div>
        </div>
        <button className='btn copyBtn'>Copy Room ID</button>
        <button className='btn leaveBtn'>Leave </button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  )
}

export default EditorPage