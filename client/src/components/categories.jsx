import React from 'react';

const Categories = props =>
{
    const {
        onGenreChange,
        currentGenre,
        allGenres
    } = props;

    return ( 
        <div className="list-group">
            <li 
                key="allGenres" 
                href="/" 
                className={CheckClass('All', currentGenre)}
                onClick={() => onGenreChange('All')}
            > All</li>
           
            {
                allGenres.map(element => (
                <li 
                    key={element._id} 
                    className={CheckClass(element.genre, currentGenre)}
                    onClick={() => onGenreChange(element.genre)}
                >
                    {element.genre}
                </li>
            ))}
        </div>
    );

}

function CheckClass(genre, currentGenre) {
    const classButtons = "list-group-item";
    return genre === currentGenre ? classButtons + ' pink text-white' :  classButtons;
}
 
export default Categories;