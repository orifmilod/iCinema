import React from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';
import './style.css';

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if(pageCount === 1) return null;

  const pages = _.range(1,pageCount + 1)
  return ( 
    <div className="pagination-container">
      <ul>
        {
          pages.length > 1 &&
          pages.map(page => (
          <li onClick={() => onPageChange(page)} className={page === currentPage ? 'page-active' : ''} key={page}>
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
}

Pagination.propTypes = { 
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired
};
 
export default Pagination;