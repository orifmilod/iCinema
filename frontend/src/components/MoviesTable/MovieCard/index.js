import React from 'react';
import FlippingCardFront from './CardFront';
import FlippingCardBack from './CardBack';
import './style.css';

const MovieCard = ({ movie }) => {
  const { title, rate, genre, image, description, _id, trailerLink, movieLength } = movie;
 
  const encodedImage = new Buffer(image.data, 'binary').toString('base64');
  const coverImage = 'data:image/jpeg;base64,' + encodedImage;
  
  return (
    <div className='card-container'>     
      <div className='card-wrapper' id={_id} onClick={() => FlipCard(_id)}>
        <FlippingCardFront 
          trailerLink={trailerLink}
          coverImage={coverImage}
          rate={rate}
          movieLength={movieLength}
          genre={genre}
          title={title}
        />
        <FlippingCardBack description={description} />
      </div>
    </div>
  );
}
const FlipCard = cardID => {
  const card = document.getElementById(`${cardID}`);
  card.classList.toggle('flipped');
}
export default MovieCard;
