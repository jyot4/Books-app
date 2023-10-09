import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home/Home'
import Header from './Header/Header'
import About from './About/About'
// import Cart from './Cart/Cart'
// import Form from "./Form/Form"
// import ProductRow from './Product/ProductRow'
import Product from "./Product/Product"
import Footer from './Footer/Footer'
import LearnMore from './About/LearnMore'
import Registeruser from './Form/RegisterUser/Registeruser'
import Login from "./Form/Login/LoginForm"
import SearchBooks from './SearchBooks/SearchBooks'
import { createContext } from 'react'
import SingleShowBook from './SingleShowBook/SingleShowBook'
import Favorite from './Favorite/Favorite'
import Profile from './Admin/Profile/Profile'
import Service from './Service/Service'
// import { Provider } from 'react'
// import  Login  from './Form/Login/Login'
export const searchContext = createContext({})

function First() {
    const [searchBooksdata, setSearchBooksData] = useState([])
    const [searchBookShow, setSearchBookShow] = useState({})
    const [totalBooks, setTotalBooks] = useState([])
    const[CurrentReadBook , setCurrentReadBook] = useState([])
    const [mostPopularBook, setMostPopularBook] = useState([])
    const [favoriteBooks , setFavoriteBooks]=useState([])
    const[filterBooks , setFilterBooks] =useState([])

    let session = localStorage.getItem("session")

    return (
        <>
            <searchContext.Provider value={{ session,mostPopularBook,setMostPopularBook ,setSearchBooksData, searchBooksdata, setSearchBookShow, searchBookShow , totalBooks ,setTotalBooks , CurrentReadBook , setCurrentReadBook,favoriteBooks,setFavoriteBooks , setFilterBooks ,filterBooks}}>
                <BrowserRouter>
                    <Header />    
                    <Routes>
                        
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/about' element={<About />}></Route>
                        <Route path='/product' element={<Product />}></Route>
                        <Route path='/admin/profile' element={<Profile />}></Route>
                        {/* <Route path='/product/productrow' element={<ProductRow />}></Route> */}
                        
                        <Route path='favorite' element={<Favorite/>}></Route>
                        <Route path='/sign' element={<Login />}></Route>
                        <Route path='/register' element={<Registeruser />}></Route>
                        <Route path='/searchbooks' element={<SearchBooks />}></Route>
                        <Route path='/singleshowbook' element={<SingleShowBook />}></Route>
                        <Route path='/learnmore' element={<LearnMore />}></Route>
                        <Route path='/service' element={<Service />}></Route>
                    </Routes>
                    <Footer />
                </BrowserRouter>      
            </searchContext.Provider>
        </>
    )
}

export default First