
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./Product.css"
import { useContext } from 'react';
import { searchContext } from '../First';
import { useNavigate } from 'react-router-dom';
import serverUrl from '../Url';
import {  ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductRow(props) {

    const {setSearchBookShow,filterBooks  } = useContext(searchContext)
 
const [dispayMsg , setDispayMsg]= useState(false) 

    const nevigate = useNavigate()
    const session = localStorage.getItem("session")
    


    useEffect(()=>{
const message =  toast.warn('if you want to see book you have to click one of the library')

if(!message){
    setDispayMsg(true)


    setTimeout(()=>{
        setDispayMsg(false)
    }, 3000)
}
    }, [])
   

// setInterval(()=>{
//   toast.warning('if you want to see book you have to click one of the liberies')
// },2000, [] )



    // console.log(totalBooks)

//............................current read book.................//


    function handleShowMore(e, data) {
        e.preventDefault()
        // let currentBookId = data._id;
        
        // axios.patch(`${serverUrl}/currentread/${session}`,{currentBookId})
        // .then((result)=>{
        //     console.log(result.data)
        
        // })
        setSearchBookShow(data)
        nevigate("/SingleShowBook")    
       
    }


 //.........................Liked Books .....................//
 
 
    function handleLike(e, data) {
        e.preventDefault() 
        let likeBookId = data;
        axios.patch(`${serverUrl}/product/${session}`,{likeBookId})
        .then((result)=>{
            console.log(result.data)
        })
    }
     


    return (
        <div className='bookRow'>
         
            <div className='book'>

                {
                    filterBooks.map((data, index) => {
                        return <Link className='singleBookAnchor' to="">
                            <div className='singleBook'>
                                 <img src={data.image} alt='images'></img>

                                <div className='openHover'>
                                    <h2>{data.title.length > 20 ? data.title.slice(0, 20) + "..." : data.title}</h2>
                                    <p>{data.author}</p>
                                    <Link onClick={(e) => handleShowMore(e, data)} to="">Show More</Link>

                                </div>

                               
                                <Link onClick={(e) => handleLike(e, data._id)} className='likeIcon' to="">
                                            <FavoriteBorderIcon />
                                        </Link>



                               
                            </div>

                        </Link>

                    })
                }
                <ToastContainer 
                position='top-center'
                
                />
            </div>
        </div>

    )
            }

        
        export default ProductRow