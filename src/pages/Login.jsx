import { useState } from "react";
import api from "../axiosConfig.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
export default function Login(props) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg,setErrormsg]=useState("")
    const navigate=useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        try{
        const response=await api.post("/login",{
            user:user,
            password:password

        })
        console.log("Logging in", response.data);
        props.setUsers(response.data.user)
        props.setUsersid(response.data.id)
        navigate("/home")
        }
        catch(error){
            if(error.response?.status===401){
            setPassword("")
            setErrormsg("Invalid username or password")
            }else{
                console.log("unable to fetch api")
                setPassword("")
                setUser("")
                setErrormsg("Internl server error")
            }
        }
        
    }

    return <>
    <div className="Login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" value={user} onChange={(e) => setUser(e.target.value)} />
            <input type="password"placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)
                 setErrormsg("")}} />
            <input type="submit" value="Submit" />
        </form>
        <p className="error">{errormsg}</p>
        <Link to="/signup">do not have account?</Link>
    </div>
    
    </>

}