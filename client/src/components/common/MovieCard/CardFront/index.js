import React from 'react';
import './style.css';

const CardFront = ({ coverImage, rate, title, genre, trailerLink, movieLength }) => {
  return ( 
    <div className="front">
      <img src={coverImage} alt="coverImage"/>
      <div className='card-footer'>
        <h4> {title} </h4>
        <p> {movieLength} / {genre} </p>
        <a href={trailerLink} target='_blank' rel='noopener noreferrer' className='trailer-btn'>watch trailer</a>
        <i className="far fa-heart fa-2x"/>
        <i class="far fa-thumbs-up like"> {rate}</i>

        {/* <i onClick={() => ToggleFavouriteCard(id)} className={liked ? "fas fa-heart fa-2x": "far fa-heart fa-2x"} />  */}
      </div>
    </div>
   );
}
export default CardFront;