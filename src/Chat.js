import { Avatar ,IconButton } from '@material-ui/core';
import {useState, useEffect} from 'react';
import React from 'react'
import './Chat.css';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";

function Chat() {
    const [seed, setSeed] =useState("");
    const [input, setInput] =useState("");
    const { chatId } = useParams();
    const [chatName, setChatName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
       if(chatId){
          db.collection('rooms').doc(chatId).onSnapshot((snapshot) =>
              setChatName(snapshot.data().name));

          db.collection("rooms").doc(chatId).collection("messages").
          orderBy('timestamp','asc').onSnapshot(snapshot =>(
              setMessages(snapshot.docs.map(doc => doc.data()))
          ))
         
       }
    }, [chatId])

    useEffect(() => {
      setSeed(Math.floor(Math.random()*5000));
    }, [chatId]);

    const sendMessage = (e) =>{
        e.preventDefault();
        console.log("You Typed --", input);

        db.collection('rooms').doc(chatId).collection('messages').add({

            message: input,
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    }

    return (
        <div className="chat">
           <div className="chat_header">
             <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>  
            <div className="chat_headerInfo">
                <h3>{chatName}</h3>
                <p>Last seen{" "}
                 {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}

                </p>
            </div>
            <div className="chat_headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
            </div> 
            <div className="chat_body">
                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && 'chat_reciever'}`}>
                    <span className="chat_name">{message.name}</span>
                     {message.message}
                     <span className="chat_timestamp">
                       {new Date(message.timestamp?.toDate()).toUTCString()} 
                     </span>
                    </p>
                ))}
                
            </div>
            <div className="chat_footer">

                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat
