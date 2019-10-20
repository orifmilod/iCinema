import React from 'react';
import './style.css';

const ListGroup = props => {
  let { onGenreChange, currentGenre, allGenres } = props;
  // console.log(allGenres);
  // if(typeof(allGenres === 'string'))
  // { 
  //   allGenres = allGenres.split('},');
  //   let aallGenres = allGenres.map((el, index) => {
  //     console.log(index);
  //     if(index !== allGenres.length - 1) el += '}'
  //     console.log(el);
  //     return JSON.parse(el); 
  //   })
  //   console.log(aallGenres);
  // }
    // allGenres.sort();
  //  console.log(allGenres);
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
export default ListGroup;

function CheckClass(genre, currentGenre) {
  const classButtons = "list-group-item list-item";
  return genre === currentGenre ? classButtons + ' list-item-active' :  classButtons;
}
 