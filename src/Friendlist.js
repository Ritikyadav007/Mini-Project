import React, { useState, useEffect} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined} from '@material-ui/icons';
import FriendlistChat from './FriendlistChat';
import './Friendlist.css';
import { useStateValue } from "./StateProvider";
import db from './firebase';

function  Friendlist() {
    const [chats, setChats] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    
    useEffect(() => {
        const start = db.collection("rooms").onSnapshot((snapshot) =>
        setChats(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        ));
        return () =>{
            start();
        }

    }, [])

    return (
        <div className="friendlist">
            
            <div className="friendlist_header">
                <Avatar src={user?.photoURL} />
                <div className="friendlist_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    
                </div>
            </div>
            <div className="friendlist_search">
                <div className="friendlist_searchContainer">
                <SearchOutlined />
                <input placeholder="Search or start a new chat"></input>
                </div>
     
            </div>
            <div className="friendlist_chats">
               <FriendlistChat addNewChat/>
               {chats.map(chat =>(
                <FriendlistChat key={chat.id} id={chat.id} name={chat.data.name} />
               ))}
            </div>
            
        </div>
    )
}

export default Friendlist;
