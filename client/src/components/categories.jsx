import React from 'react';
import '../css/listGroup.css';
const Categories = props =>
{
  const {
    onGenreChange,
    currentGenre,
    allGenres
  } = props;

  return ( 
    <div className="list-group">
      <li key="allGenres" href="/" className={CheckClass('All', currentGenre)} onClick={() => onGenreChange('All')}> All</li>
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
 
export default Categories;