import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Product.css"
import ProductRow from './ProductRow'
import axios from 'axios'
import { useContext } from 'react'
import { searchContext } from '../First'
import serverUrl from '../Url'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

function Product() {


  const [hiddenList, setHiddenList] = useState(false)


  function menu(e) {
    e.preventDefault();
    setHiddenList(false)
  }

  function stops(e) {
    e.preventDefault();
    setHiddenList(true)

  }

  const [allBooks, setAllBooks] = useState(false)

  const { totalBooks, session, setTotalBooks, setFilterBooks } = useContext(searchContext)


  //.........................total books........................//

  useEffect(() => {
    axios.get(`http://localhost:8080/product`)
      .then((result) => {
        console.log(result.data)
        setTotalBooks(result.data)
      })

  }, [])


  //.................................Books List Click ..............//

  function handleClick(value) {
    console.log(value)
    setAllBooks(true)
    let listValue = value
    axios.post(`http://localhost:8080/listdata `, { listValue })
      .then((result) => {
        console.log(result.data)
        setFilterBooks(result.data)
      })
  }

  //........................Like Books.........................//

  function likeBooks() {
    // console.log("clickLiked")
    axios.get(`${serverUrl}/likebooks/${session}`)
      .then((result) => {
        setFilterBooks(result.data)
      })

  }

  //.........................Search Books.........................//
  function searchBooks() {

    axios.get(`${serverUrl}/searchbooks/${session}`)
      .then((result) => {
        setFilterBooks(result.data)
      })
  }

  //.........................Current Read Books.......................//

  function currentReadBooks() {
    axios.get(`${serverUrl}/currentreadbooks/${session}`)
      .then((result) => {
        setFilterBooks(result.data)
      })
  }

  //.........................Comment Books....................//
  function commentBooks() {
    axios.get(`${serverUrl}/commentbooks/${session}`)
      .then((result) => {
        setFilterBooks(result.data.collectdata)
        console.log(result.data.collectdata)
      })
  }

  //.........................Rating Books.........................//

  function ratingBooks() {
    axios.get(`${serverUrl}/ratingbooks/${session}`)
      .then((result) => {
        setFilterBooks(result.data.collectData)
        console.log(result.data.collectdata)
      })
  }
  return (
    <>
      <div className='books'>
        <div className='left'>
        {
            hiddenList 

              ? <Link to='' className='close' onClick={menu}><CloseIcon /></Link> :
              <Link to='' className='start' onClick={stops}><MoreVertIcon /></Link>
          }
          <h2>Bookshelf Chronicles</h2>
          <h3>History</h3>
          <ul   style = {{ top : hiddenList ? "80px" : "-500px"}}className='nav'>
            <li onClick={likeBooks}><Link to="">Favorite</Link></li>
            <li onClick={commentBooks}><Link to="">Commented</Link></li>
            <li onClick={currentReadBooks}><Link to="">Current Read</Link></li>
            <li onClick={ratingBooks}><Link to="">Rating</Link></li>
            <li onClick={searchBooks}><Link to="">Search</Link></li>
          </ul>
          <h3>Library</h3>
          <ul  style = {{ top : hiddenList ? "80px" : "-500px"}} className='nav2'>

            <li onClick={() => handleClick("mostpopular")}><Link to="">Most popular</Link></li>

            <li onClick={() => handleClick("poetry")}><Link to="">Poetry</Link></li>
            <li onClick={() => handleClick("fantasy")}><Link to="">fantasy</Link></li>
            <li onClick={() => handleClick("romance")}><Link to="">Romance</Link></li>


          </ul>


         
        </div>
        <div className='right'>
          <ProductRow />

        </div>
      </div>
    </>
  )
}

export default Product