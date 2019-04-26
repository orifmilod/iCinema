import React from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';


const Pagination = (props) => {

    const {itemsCount, pageSize,onPageChange, currentPage } = props;
    const pageCount = Math.ceil (itemsCount / pageSize);
    if(pageCount === 1) return null;
    const pages = _.range(1,pageCount + 1)

    return ( 
        <div className="justify-content-center d-flex">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pages.map(page => (
                        <li className={page === currentPage ? 'page-item active' : 'page-item'} key={page}>
                            <a className="page-link" onClick={() => onPageChange(page)}> {page} </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
Pagination.propTypes = { 
    itemsCount: propTypes.number.isRequired,
    pageSize:propTypes.number.isRequired,
    onPageChange:propTypes.func.isRequired,
    currentPage: propTypes.number.isRequired
};
 
export default Pagination;