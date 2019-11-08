import React from 'react';
import './style.css';

const ListGroup = props => {
  let { onChange, active, options } = props;
  
  options.sort();
  return ( 
    <div className="list-group">  
      <li key='all'className={CheckClass('All', active)} onClick={() => onChange('All')}> All
      </li>
      { 
        options &&
        options.map(el => 
          <li 
            key={el._id} 
            className={CheckClass(el.genre, active)}
            onClick={() => onChange(el.genre)}>
            {el.genre}
          </li>
        )}
    </div>
  );
}
export default ListGroup;

function CheckClass(genre, active) {
  const classButtons = "list-group-item list-item";
  return genre === active ? classButtons + ' list-item-active' :  classButtons;
}
 