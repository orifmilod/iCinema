import React from 'react';
import './style.css';

const Rating = ({ total, filled, onChange }) => {
  if (total < 2) return;

  let components = []
  for (let i = 0;  i < total; i++) {
    components.push(<i key={i} onClick={() => onChange(i + 1)} className={`${i < filled ? 'fas' : 'far'} fa-star fa-lg`}/>)
  }

  return ( 
    <div className='rating-container'>
      {components.map(el => el)}
    </div> 
  );
}
 
export default Rating;