import React from 'react'
import noPosterIMG from '../../images/noposter.jpg';
import '../../css/movieCard.css';
import fs from 'fs';


const MovieCard = ({ movie }) => {
    const { title, rate, price, genre, image } = movie;
    let encodedImage = new Buffer(image.data, 'binary').toString('base64');
    var coverImage = 'data:image/jpeg;base64,' + encodedImage
    return ( 
        <div className="card-box col-lg-3 col-md-4">
            <div>
                <img src={coverImage ? coverImage : noPosterIMG} alt="coverImage"/>
            </div>
            <span>{rate}</span>
            <p>{title}</p>
            <small>{genre}</small>
         
        </div>
    );
}
 
export default MovieCard;