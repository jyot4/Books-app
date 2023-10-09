import React, { useContext, useState ,useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
import { searchContext } from '../First'
import "./ShowSingleBook.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import {toast } from "react-toastify";
import serverUrl from '../Url'

function SingleShowBook() {
    const { searchBookShow , session} = useContext(searchContext)
    const [inputValue, setInputValue] = useState("")
    const [rating, setRating] = useState(0);
    const [clickRating, setClickRating] = useState(false);

    // console.log(searchBookShow.image)

    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = (e) => {
        e.preventDefault()
        setShowFullDescription(!showFullDescription);
    };

    // console.log(searchBookShow.description)
    const description = (showFullDescription)
        ? searchBookShow.description
        : searchBookShow.description.slice(0, 300) + '...';


    function handleCommentSubmit(e, bookId) {
        e.preventDefault()

        let commentBook = bookId
        let session = localStorage.getItem("session")

        axios.patch(`http://localhost:8080/commentbook/${session}`, { commentBook, inputValue })
            .then((result) => {
                console.log(result.data)
                // toast.success(result.data)
            })

    }

    //.......................rating book...................//

    function handleRate(stars) {
        setRating(stars);
        setClickRating(true)
      };
    

      useEffect(() => {
        let ratingBook = searchBookShow._id;
        if (clickRating) {
            console.log(rating)
          axios.patch(`${serverUrl}/rating/${session}`, { ratingBook, rating })
            .then((result) => {
              if (result.data.status === 200) {
                toast.success(result.data.message)
              } else {
                toast.success(result.data.message)
              }
            }).catch((err) => {
              console.log(err)
            })
        }
    
        
      }, [rating])




    return (
        <div className='singleShowBook'>
            <div className='left'>
                <img src={searchBookShow.image} alt='images'></img>
                <div className="rating-section">
                    {/* <p>Rate this book:</p> */}
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${rating >= star ? "active" : ""}`}
                                onClick={() => handleRate(star)} >
                                     &#9733;
                               
                            </span>
                        ))}
                    </div>
                    <p>{rating > 0 ? `Thank you for rating ${rating} stars!` : ""}</p>
                </div>
                <form onSubmit={(e) => { handleCommentSubmit(e, searchBookShow._id) }}>
                    <textarea type='text' value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} placeholder='Write your review...'></textarea>
                    <button type='submit'>Submit</button>
                </form>
            </div>
            {/* <ToastContainer
              position="top-center"
              autoClose={3000}
              theme="dark"
            /> */}
            <div className='right'>
                <h1>{`${"Title : "} ${searchBookShow.title}`}</h1>
                <h2 className='other1Content'>Author <span>&</span> BookType</h2>
                <div className='other1'>
                    <h4 className='author'>{`${"Author : "}${searchBookShow.author}`}</h4>
                    <h4 className='bookType'>{`${"BookType : "}${searchBookShow.bookType}`}</h4>
                </div>
                <h2 className='other2Content'>publishedDate <span>&</span> publisher</h2>
                <div className='other2'>
                    <h4 className='publishedDate'>{`${"publishedDate : "}${searchBookShow.publishedDate}`}</h4>
                    <h4 className='publisher'>{`${"publisher : "}${searchBookShow.publisher}`}</h4>
                </div>
                <p>{description}</p>
                {searchBookShow.description.length > 300 && (
                    <Link onClick={toggleDescription}>
                        {showFullDescription ? 'Read Less' : 'Read More'}
                    </Link>
                )}

            </div>
        </div>

    )
}

export default SingleShowBook