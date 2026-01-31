import { useState } from "react";
import Chatheader from "../assets/chatheader";
import Chatbox from "../assets/chatbox.jsx"
import "./home.css"

export default function Home(props) {
    const [chat,setChat]=useState({});


    return <>
    
    <div className="home-container">
        <div className="chat-header"><Chatheader user={props.user} userid={props.userid} setchat={setChat}/></div>
        <div className="chatbox"><Chatbox chat={chat} userid={props.userid}/></div>

    </div>
    
    </>

}