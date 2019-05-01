import React from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';
import '../../css/pagination.css';

const Pagination = (props) => {

    const {itemsCount, pageSize,onPageChange, currentPage } = props;
    const pageCount = Math.ceil (itemsCount / pageSize);
    if(pageCount === 1) return null;
    const pages = _.range(1,pageCount + 1)

    return ( 
        <div className="justify-content-center d-flex">
            <nav id="pageNav">
                <ul>
                    {pages.map(page => (
                        <li onClick={() => onPageChange(page)} className={page === currentPage ? 'page-active page-btn' : 'page-btn'} key={page}>
                            {page}
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