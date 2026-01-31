import {useState} from "react";
import api from "../axiosConfig";
import { Link,useNavigate } from "react-router-dom";
import "./signup.css"


export default function Signup(){
    const [user,setUser]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmpassword]=useState()
    const [errormsg,setErrormsg]=useState()
    const navigate=useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()
        try{
            if(password===confirmpassword){
            const response= await api.post("/signup",{
                user:user,
                password:password

            });
            console.log("Signup successful",response.data)
            alert("signup successful")
            navigate("/");
            }else{
                setErrormsg("password mismatch with confirm password")
            }
        }
        catch(error){

            if(error.response?.status===401){

                setErrormsg("user already exists")
                setUser("")
                setConfirmpassword("")
                setPassword("")
            }else{
                setErrormsg("Internal server error")
                console.log("Unable to fetch api")
                setUser("")
                setPassword("")
                setConfirmpassword("")
            }

        }
        
    }

    return <>

    <div className="signup-container">

        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" value={user} onChange={(e) => setUser(e.target.value)} />
            <input type="password"placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)
                 setErrormsg("")}} />
            <input type="password" placeholder="confirm password" value={confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)}/>
            <input type="submit" value="Submit" />
        </form>
        <p className="error">{errormsg}</p>
        <Link to="/">have account?</Link>
    </div>

    </>
};