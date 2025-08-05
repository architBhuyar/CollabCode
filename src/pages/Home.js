import React, { useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Home = () => {

  const navigate = useNavigate();

  //state for room id
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');

  // generating unique ID
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuid4();
    // console.log(id);
    setRoomId(id);
    toast.success("created a new room !");
  };

  // join room 
  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error("Room ID & user name is required !!!");
      return;
    }
    navigate('/editor/${roomId}', {
      state: {
        userName,
      }
    })
  };

  const handleInputEnter=(e)=>{
      if(e.code === 'Enter'){
        joinRoom();
      }
  }

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img src='/codeCollab.png' alt='codeCollab-logo' className="homePageLogo"></img>
        <h4 className="mainLable">Enter Room ID : </h4>
        <div className="inputGrp">

          <input
            type="text" className="inputBox" placeholder='Room ID'
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
            />

          <input type="text" className="inputBox" placeholder='User Name'
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            onKeyUp={handleInputEnter}
          />

          <button className="btn joinBtn" onClick={joinRoom}>
            Join Room
          </button>
          <span className="createInfo">
            If you dont have invite then create &nbsp;
            <a onClick={createNewRoom} href="" className="createNewBtn">
              New Room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>Build By 💻 &nbsp;{'  '}<a href="gitLink"></a>ARB</h4>
      </footer>
    </div>
  )
}

export default Home