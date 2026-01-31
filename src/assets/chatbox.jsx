import { useEffect, useState } from "react";
import { connectWebSocket, stompClient } from "../websocket/websocket";
import api from "../axiosConfig";
import "./chatbox.css"

export default function Chatbox({userid,chat}) {

    const [message,setMessage]=useState("");
    const [responsedata,setResponsedata]=useState([])


    function handlesend() {
        if (!stompClient || !stompClient.connected) {
            console.error("STOMP not connected");
            return;
        }

        if (message.trim() === "") return;

        stompClient.publish({
            destination: "/app/sendmsg",
            body: JSON.stringify({
                message,
                senderid: userid,
                receiverid: chat.otheruserid,
                chatid: chat.chatid
            })
        });

        setMessage("");
    }

    async function getMessages(){
        try{

            const response=await api.get(`/getmsgs/${chat.chatid}`)
            setResponsedata(response.data);
            console.log("messages fetching successful")

        }
        catch(error){
            console.log("Internal server error")

        }
    }

    useEffect(()=>{
        if(!chat||!chat.chatid)return;
        getMessages();
    },[chat])

    useEffect(() => {
    if (!chat?.chatid) return;

    let subscription;

    connectWebSocket(() => {
        subscription = stompClient.subscribe(
            `/topic/chat/${chat.chatid}`,
            (msg) => {
                const newMsg = JSON.parse(msg.body);
                setResponsedata(prev => [...prev, newMsg]);
            }
        );
    });

    return () => {
        if (subscription) {
            subscription.unsubscribe();
        }
    };
}, [chat?.chatid]);






    if (!chat||!chat.chatid) {
        return (
            <div className="no-chat-selected">
                <h3>👈 Click any chat to start chatting</h3>
            </div>
        );
    }


    return <>
    <div className="chatbox">
    <div className="chatname">{chat.otheruser}</div>
    <div className="chat-messages">
    {responsedata.map(msg=>(
        userid==msg.senderid?(<div className="user-messages"  key={msg.id}>{msg.message}</div>):(<div className="otheruser-messages"  key={msg.id}>{msg.message}</div>)
    ))}
    </div>
    <div className="send-message">
        <input type="text" value={message} placeholder="message..." onChange={(e)=>setMessage(e.target.value)}
        onKeyDown={(e)=>{
            if(e.key === "Enter"&&!e.shiftKey){
                e.preventDefault()
                handlesend()
        }}}/>
        <input type="submit" value="send" onClick={()=>{handlesend()}} />
    </div>
    </div>
    </>
}