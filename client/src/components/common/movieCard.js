import React from 'react'
import sampleIcon from '../../s-l300.jpg';
import '../../css/movieCard.css';

const MovieCard = ({ movie }) => {
    const { title, rating, price, genre, image } = movie;
    return ( 
        <div className="card-box col-lg-3 col-md-4">
            <img src={sampleIcon} alt="a"/>
            <span>1.3</span>
            <p>{title}</p>
            <small>{genre}</small>
        </div>
    );
}
 
export default MovieCard;