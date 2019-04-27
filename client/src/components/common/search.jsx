import React from 'react'
import StringSimilarity from 'string-similarity'; 
import '../../css/input.css';

export const SearchBar = ({ onSearch, name }) => {
    return (
        <div className="w-100 inputt">
            <span className="fa fa-search input-icon"></span>
            <input 
                className="col-12" 
                name={name}
                // onChange={onSearch}
                type="text" 
                placeholder="Search..." 
                aria-label="Search"
            />
        </div>
    )
}


export function SearchItem(item, items, filterBy)
{
    const filter = items.filter(element => 
        element[filterBy].toString().toLowerCase().startsWith(item.toString().toLowerCase())
    )
    return filter;
}


/* USING string-similarity */
export function SearchItems (item, Items, filterBy, similarityPercent = 0.1) 
{
    let filteredString = [];
    Items.forEach(element => {
        filteredString.push(element[filterBy])
    });

    let filteredItems = StringSimilarity.findBestMatch(item, filteredString)

    /* Arranging filtered items by best rating */
    filteredItems = filteredItems.ratings.sort((a, b) => {
        if(a.rating > b.rating)  return -1
        else return 1
    })

    /* Removing low ratings from the list */
    let closestMatchest = [];
    filteredItems.forEach(element => {
        if(element.rating >= similarityPercent) closestMatchest.push(element);
    })

    /*Matched items from the list*/
    let ItemMatches = []
    for (let i = 0; i < Items.length; i++) {

        for (let j = 0; j < closestMatchest.length; j++) {
           if(Items[i][filterBy] === filteredItems[j]["target"])
            {
                ItemMatches.push(Items[j]);
            }
        }
    }
    return ItemMatches;
}