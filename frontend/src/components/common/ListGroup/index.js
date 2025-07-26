import React from 'react';
import './style.css';

const ListGroup = props => {
  const { onChange, active, options } = props;
  
  return ( 
    <ul className="list-group">
      { 
        options &&
        options.map(option => 
          <li 
            key={option.name} 
            className={CheckClass(option.name, active)}
            onClick={() => onChange(option.name)}>
            {option.name}
          </li>
        )}
    </ul>
  );
}
export default ListGroup;

function CheckClass(name, active) {
  const classButtons = "list-group-item list-item";
  return name === active ? classButtons + ' list-item-active' :  classButtons;
}
