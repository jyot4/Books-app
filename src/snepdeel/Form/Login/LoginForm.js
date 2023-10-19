import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "./LoginForm.css"
import { useNavigate } from 'react-router-dom'
import axios from "axios" 



function LoginForm() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  console.log(localStorage.getItem("session"))

  function handleLogin (e){
    e.preventDefault()
    axios.post("http://localhost:8080/login",{username,password})
    .then((result)=>{
      if(result.status === 200){ 
        console.log("maja aa gya")
        localStorage.setItem("session", result.data)
         navigate("/")
       
      } else {
        console.log("dya kuch to gadbad hai")
      }
    }) 
   

  }



  return (
    <>
      < div className='login'>
        <div className='loginContent'>
          <h1>Login</h1>
          
          <form className='loginform' method='post' onSubmit={handleLogin}>
            <label>Username </label>
            <input type="text" name='username'
            value={username} onChange={e => {setUsername(e.target.value)}}
              placeholder='Username'></input><br />
               <label>Password </label>

            <input type="password" name='password'
            value={password}
            onChange={e => {setPassword(e.target.value)}}
              placeholder='Password'></input><br />
            <button type='submit' name='login' className='loginBtn'>Login</button>
          </form>
              {/* <Link to="/register">Create account </Link>    */}
          <div> <Link to="/register" className='anchor'>create</Link> </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm