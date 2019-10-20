import React from 'react'
import './style.css';

const CardBack = ({ ToggleFavouriteCard, id, liked, description }) => {
  return ( 
    <div className="back">
       <h5> Summary </h5>
        <p> { description } </p>
    </div>
    );
}
  
export default CardBack;
