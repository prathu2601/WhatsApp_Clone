import React, {useState, useEffect} from 'react'

import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

import './Chat.css'
import { Search } from '@material-ui/icons';
import { useParams } from 'react-router-dom';

import db from '../firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const [roomName, setRoomName ] = useState("");
    const [messages, setMessages ] = useState([]);
    const { roomId } = useParams();
    const [{user}, dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name)
            ))
        }
        setSeed(Math.floor(Math.random() * 5000));

        db
            .collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot=>(setMessages(snapshot.docs.map((doc) => doc.data()))
        ))
    },[roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log( input );

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/Mouth=['smile']${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__message ${ message.name===user.displayName && "chat__reciver"}`}>
                        <span className="chat__name">{message.name }</span>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form onSubmit={sendMessage} type="submit">
                    <input value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Type a message" type="text"/>
                    <button>Send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
