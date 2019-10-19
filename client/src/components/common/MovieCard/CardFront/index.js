import React from 'react';
// import noPosterIMG from '../../../../images/noposter.jpg';
import './style.css';
const CardFront = ({ description, image, coverImage, rate, title, genre }) => {
  return ( 
    <div className="front">
      <img src={coverImage} alt="coverImage"/>
      <div className='card-footer'>
        <h4> {title} </h4>
        <p> 2h 15min / {genre} </p>
        <button>watch trailer</button>
        <i className="far fa-heart fa-2x"/>
      </div>
    </div>
   );
}
export default CardFront;