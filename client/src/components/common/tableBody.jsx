import React from 'react';
import _ from 'lodash';

function renderCell (item, column){
  if(column.content)  return column.content(item)
  else return _.get(item, column['path'])
}
const TableBody = ({ data, columns }) => {
  return ( 
    <tbody>
        {data.map(item => <tr key={item['_id']}>
            {columns.map(column => <td key={column['label']}> {renderCell(item,column)} </td>)}   
          </tr>
        )}
      </tbody>
   );
}
export default TableBody;