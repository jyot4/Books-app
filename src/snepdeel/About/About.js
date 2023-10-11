import React from 'react'
import "./About.css"
import { Link } from 'react-router-dom'
import image2 from "./imgg.jpg"

function About() {
  return (
    <>
      <div className='about'>
        <div className="banner">
          <div className='bannerContent'>
            <h1>BookShelf</h1>
            <p>The right book in the right hands at the right time
              can change the world.The right book in the right hands at the right time
              can change the world.</p>
            {/* <img src={AboutImage}/> */}
            <Link to="/learnmore">LEARN MORE ABOUT US</Link>
          </div>

        </div>

        <div className='Content2'>
          <div className='right'>
            <img src={image2}></img>
          </div>
          <div className='left'>
            <h3>Mission of Bookshelf</h3>
            <p>Our mission at Bookshelf is to foster a vibrant and inclusive community of readers, celebrating the magic of books and the power of storytelling. We are committed to promoting literary exploration, encouraging thoughtful dialogue, and supporting authors as they share their unique voices with the world.</p>
          </div>

        </div>
      </div>




    </>
  )
}

export default About