import React from "react";
import _ from "lodash";
import "./style.css";

export default function Pagination(props) {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <div className="pagination-container">
      <ul>
        {pages.length > 1 &&
          pages.map((page) => (
            <li
              key={page}
              onClick={() => onPageChange(page)}
              className={page === currentPage ? "page-active" : ""}
            >
              {page}
            </li>
          ))}
      </ul>
    </div>
  );
}

