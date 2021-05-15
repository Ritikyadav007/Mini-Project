import { Avatar } from '@material-ui/core';
import React ,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import db from './firebase';
import './FriendlistChat.css';

function FriendlistChat({ id, name, addNewChat }) {
  const [seed, setSeed] =useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').
      onSnapshot((snapshot) => 
        setMessages(snapshot.docs.map((doc) =>
        doc.data()
        ))
      );
    }
  }, [id])


  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000));
  }, [])
  
  const createChat = ()=>{
      const chatName= prompt("Please enter name for chat");

      if(chatName){
        db.collection('rooms').add({
          name: chatName,
        })

      }
    
  };
  
  return !addNewChat ? (
      <Link to={`/chats/${id}`}>
        <div className="friendlistChat">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
          <div className="friendlistChat_info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
        </Link>
    ) : (
      <div onClick={createChat} className="friendlistChat">
        <h2>Add New Chat</h2>
      </div>
    );
}

export default FriendlistChat
