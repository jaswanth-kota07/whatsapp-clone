import { useState } from 'react'
import Navigator from './assets/Navigator.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/home.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Signup from './pages/signup.jsx'

function App() {
  const [user, setUser] = useState("")
  const [userid,setUserid]=useState(0)

  return (
    <>
    <BrowserRouter>
    <Navigator user={user} setUser={setUser} setUserid={setUserid}/>
      <Routes>
        <Route path='/' element={<Login setUsers={setUser} setUsersid={setUserid}/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/Home' element={<Home user={user} userid={userid}/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
