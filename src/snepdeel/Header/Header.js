import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"
// import logo from "../../juCUFrK (1).png"
import { useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios'
import { searchContext } from '../First'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import Profile from '../Admin/Profile/Profile';
// import Favorite from '../Favorite/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import Home from '../Home/Home';

// import axios from 'axios'

function Header() {
  const { setSearchBooksData, favoriteBooks } = useContext(searchContext)

  const [inputValue, setInputValue] = useState("")
  const nevigate = useNavigate()
  const[admin , setAdmin]= useState(false)

  const session = localStorage.getItem("session")


//................................Search books...................//


  function handleSearch(e) {
    e.preventDefault()
    // console.log(inputValue)
    axios.post('http://localhost:8080/searchbooks', { inputValue})
      .then((result) => {
        setSearchBooksData(result.data)
        console.log("aa gya searchbooksdata");
        nevigate("/searchbooks")
        console.log(result.data)
      })

  }
//...............................like Componant .....................//

  function likeHander() {
    let likeChanges = false;
    if (favoriteBooks.length !== 0) {
      likeChanges = true
    }
    return likeChanges
  }


  //..........................Admin work.......................//

  function adminPanelOpen(e){
    e.preventDefault()
    setAdmin(true)

  }

  function adminPanelClose(e){
    e.preventDefault()
    setAdmin(false)
  }

  //................................Admin Profile work ..................//

function profileOpen (e){
  e.preventDefault()
  setAdmin(false)
  nevigate("/admin/profile")
}




//..........................Admin Logout...............................//

function handleLogout(e) {
  e.preventDefault();
 localStorage.setItem("session","")
 nevigate("/sign")
}
// console.log(favoriteBooks)

//...........................................................//


  return (
    <>
      <header>
        <div className='topHeader'>
          <h1>BookShelf</h1>
          <div className='searchButton'>
            <form mathod="post" onSubmit={handleSearch} >
              <input autoFocus type='text' placeholder='Enter product name'
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value) }}
              ></input>
              <button type='submit' className='searchBtn'>Search</button>
            </form>
           
          </div>
          <ul>
            <li>{
              likeHander()
                ?
                <Link className='first' to="/favorite"><FavoriteIcon /></Link>
                :
                <Link className='first' to="/favorite"><FavoriteBorderIcon /></Link>
            }
            </li>
            <li>{
              (localStorage.getItem("session")) ? <Link onClick={adminPanelOpen} ><AccountCircleIcon/></Link> : <Link to="/sign" >Login</Link>
            }
            </li>
          </ul>
        </div>
        <div className='bottomHeader'>
          <ul>
          <li>
              <Link to="/">Home</Link>

            </li>
            
            <li>
              <Link to="/about">About</Link>

            </li>
            <li>
              <Link to="/product">Books</Link>

            </li>
           
            <li>
              <Link to="/service">Service</Link>

            </li>
          </ul>
        </div>
        <div className='admin' style={{right:admin?"0":"-10%"}}>
          <h2 onClick={adminPanelClose}><CloseIcon/></h2>
          <ul>
            <li><Link to="" onClick={profileOpen}>Profile</Link></li>
            <li><Link to="">History</Link></li>
            <li><Link onClick={handleLogout} to="">Logout</Link></li>
          </ul>
        </div>
      </header>
    </>
  )
}

export default Header