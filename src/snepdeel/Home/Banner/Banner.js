import React from 'react';
import "./Banner.css";
import BannerImage from "../../../book.jpg";

function Banner() {
    return (
        <div className='banner'>
            {/* Background Image */}
            <div className='backgroundImage'>
                <img src={BannerImage} alt="Banner" />
            </div>

            {/* Overlay Content */}
            <div className='overlayContent'>
                <h1>"Welcome to Bookshelf - Your Portal to the World of Literature!"</h1>
            </div>
        </div>
    );
}

export default Banner;
