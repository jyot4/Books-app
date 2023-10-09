import React, { useState } from 'react'
import { useContext } from 'react'
import { searchContext } from '../First'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "./SearchBooks.css"
import serverUrl from '../Url'
import axios from 'axios'

function SearchBooks() {
    const Navigate = useNavigate()
    const [searchBookId , setSearchBookId ] = useState("")
    
    


    const { session,searchBooksdata ,setSearchBookShow } = useContext(searchContext)
  
    function handleShowBooks (e ,book, bookId
        ){
        e.preventDefault()
        setSearchBookId(bookId)
      
                // console.log (bookId)
        if(session){
            setSearchBookShow(book)
            axios.patch(`${serverUrl}/searchonclick/${session}` , {bookId})
            .then((result)=>{
                console.log(result.data)   
            })
            Navigate("/SingleShowBook")
        }
        else{
            Navigate("/sign")

            alert("You can't read this book. You have loggedin first")
        }
       
        

    }

    return (
        <>
            <div className='searchBooks'>
                {
                    searchBooksdata.map((book, index) => {
                        return <Link className='bookLink' to=""  onClick={(e)=>handleShowBooks(e,book, book._id
                            )} key={index}>
                            <div className='searchBook'>
                                <img src={book.image} alt='images'></img>
                                <p>{book.bookType.slice(0, 1).toUpperCase() + book.bookType.slice(1)}</p>
                                <h1>{(book.title.length > 25) ? book.title.slice(0, 30) + "..." : book.title}</h1>
                                <h3>{`${"By - "}${book.author}`}</h3>

                            </div>
                        </Link>
                    })
                }
            </div>
        </>
    )
}

export default SearchBooks