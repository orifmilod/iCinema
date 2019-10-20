import React, { Component } from 'react';

class TableMaker extends Component {
  renderSortIcon = column => {
    const { sortColumn }= this.props;
    if(column.path !== sortColumn.path) return null;
    if(sortColumn.order === 'asc') return <i className="fa fa-sort-up"/>
    return <i className="fa fa-sort-down"></i>
  }
  raiseSort = path => {
    // path is the columnd like Title, Genre, Stock, Rate
    const sortColumn = {...this.props.sortColumn}
    if(path === sortColumn.path) sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else { 
      sortColumn.path = path
      sortColumn.order = 'asc'
    }
    this.props.onSort(sortColumn);
  }
  render() { 
    return ( 
      <thead>
        <tr> 
        { this.props.columns.map(column => 
          <th  
            key={column.path || column.key}
            onClick={() => this.raiseSort( column.path )} 
            style={{textAlign:'center'}}
          > 
          {column.label} 
          {this.renderSortIcon(column)}
          </th>
        )}
       </tr>
      </thead>
    );
  }
}


 
export default TableMaker;