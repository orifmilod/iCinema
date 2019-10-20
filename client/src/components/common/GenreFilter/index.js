import React from 'react';
import './style.css';

const ListGroup = props => {
  const { onGenreChange, currentGenre, allGenres } = props;
  allGenres.sort();
  return ( 
    <div className="list-group">  
      <li 
        key='all'className={CheckClass('All', currentGenre)} 
        onClick={() => onGenreChange('All')}> All
      </li>
      { 
        allGenres &&
        allGenres.map(element => <li 
          key={element._id} 
          className={CheckClass(element.genre, currentGenre)}
          onClick={() => onGenreChange(element.genre)}>
          {element.genre}
        </li>
      )}
    </div>
  );
}

function CheckClass(genre, currentGenre) {
  const classButtons = "list-group-item list-item";
  return genre === currentGenre ? classButtons + ' list-item-active' :  classButtons;
}
 
export default ListGroup;