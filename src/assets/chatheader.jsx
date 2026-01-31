import { useState,useEffect } from "react";
import api from "../axiosConfig";
import "./chatheader.css"



export default function Chatheader(props) {
    const [newchatuser,setNewchatuser]=useState("")
    const [search,setSearch]=useState("");
    const [responsedata,setResponsedata]=useState([])
    const [showcreate,setShowcreate]=useState(false);
    const [errormsg,setErrormsg]=useState("")
    const [newchaterrormsg,setNewchaterrormsg]=useState("")
    async function handleChange() {
        try{
        var response;
        if(search===""){
        response=await api.get(`/chats/${props.userid}`)
        }else{
        response=await api.get(`/search/${props.userid}?keyword=${search}`)
        }
        setResponsedata(response.data);
        }
        catch(error){
            if(error.response && error.response.data){
                setErrormsg(error.response.data)
                setResponsedata([])
            }
            else{
                setErrormsg("internal server error")
                console.log("unable to fetch api");
            }
        }
    }

    async function handlesubmit() {
        try{
            const response=await api.post(`/createchat/${props.userid}?otheruser=${newchatuser}`);
            setNewchatuser("")
            setNewchaterrormsg(response.data)
            handleChange();
            console.log("chat creation successful")

        }
        catch(error){
            setNewchatuser("");
            if (error.response && error.response.data) {
                setNewchaterrormsg(error.response.data);
            } else {
                setNewchaterrormsg("Internal server error");
                console.log("Unable to fetch API");
            }
        }
        
    }
    useEffect(() => {
        if (!props.userid) return;
        const timeoutId = setTimeout(() => {
        handleChange();
        }, 400);
        return () => clearTimeout(timeoutId);
    }, [search, props.userid]);


    return <>
    <div className="chatheader">
       <button onClick={()=>setShowcreate(!showcreate)}>New chat</button>
       {showcreate&&(
        <div><input type="text" value={newchatuser} placeholder="username.." onChange={(e) =>{ setNewchatuser(e.target.value);setNewchaterrormsg("")}} required />
        <input type="submit" onClick={()=>handlesubmit()} value="create"/>
        <p>{newchaterrormsg}</p>
        </div>
       )}
       
       <input type="search" value={search} placeholder="search..." onChange={(e)=>{setSearch(e.target.value);setErrormsg("")}}/>
       {responsedata.map(chat=>(
        <div key={chat.chatid} className="chats"onClick={()=>{props.setchat(chat)}}><p>{chat.otheruser}</p></div>
       ))}
       <p>{errormsg}</p>
    </div>
    </>

}