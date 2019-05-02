import React from 'react'
import noPosterIMG from '../../images/noposter.jpg';
import '../../css/movieCard.css';

const MovieCard = ({ movie }) => {
    const { title, rate, price, genre, image } = movie;
    let encodedImage = new Buffer(image.data, 'binary').toString('base64');
    var coverImage = 'data:image/jpeg;base64,' + encodedImage
    return ( 
        <div className="card-container col-lg-3 col-md-4">
             <div className="thecard">
                <div className="front-card">
                    <img src={coverImage ? coverImage : noPosterIMG} alt="coverImage"/>
                    <span>{rate}</span>
                </div>

                <div className="back-card">
                    <p>
                        Thousands of years ago, five African tribes war over a meteorite containing vibranium. One warrior ingests a "heart-shaped herb" affected by the metal and gains superhuman abilities, becoming the first "Black Panther". He unites all but the Jabari Tribe to form the nation of Wakanda.
                    </p>
                </div>
            </div>      

            <div className="details">
                <p>{title}</p>
                <small>{genre}</small>
            </div> 
        </div>
    );
}
 
export default MovieCard;