import React from 'react'
import './style.css';

const CardBack = ({ ToggleFavouriteCard, id, liked, description }) => {
  return ( 
    <div className="back">
       <h5> Summary </h5>
      <p> { description } </p>
        
      {/* <span> <i onClick={() => ToggleFavouriteCard(id)} className={liked ? "fas fa-heart fa-2x": "far fa-heart fa-2x"} /> </span>
      <h5>About</h5>
      <p>{description}</p> */}
    </div>
    );
}
  
export default CardBack;
