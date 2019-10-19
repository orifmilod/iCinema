import React from 'react';
// import noPosterIMG from '../../../../images/noposter.jpg';
import './style.css';
const CardFront = ({ image, coverImage, rate }) => {
  let url = 'http://t0.gstatic.com/images?q=tbn:ANd9GcSJKLiEyyz1Q9RC8EBYl3ijr3nuGeyO2ETmwy6Kdq0AQtD0elWD'
  return ( 
    <div className="front">
      <img src={coverImage} alt="coverImage"/>
      <span>{rate}</span>
      <div className='card-footer'>
        <p> Some name </p>
        <small> Drama </small>
      </div>
    </div>
   );
}
export default CardFront;