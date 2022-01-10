import React, {useState, useEffect} from 'react'
import './SidebarChat.css'

import db from '../firebase';

import { Link } from 'react-router-dom';
import { Avatar, IconButton } from '@material-ui/core';

function SidebarChat({id, name, addNewChat}) {
    const [messages, setMessages] = useState("");
    
    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);

    const createChat = () => {
        const roomName = prompt("Please enter name for Chat room :- ")
        if( roomName ){
            db.collection('rooms').add({
                name: roomName,
            })
        }
    };

    return (!addNewChat) ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/Mouth=['smile']${Math.random() * 5000}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>  
        </Link>
    ):(
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
