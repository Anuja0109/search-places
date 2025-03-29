import { useState } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

function Pagination({ handlePageClick, totalItems, limit, handleLimitChange }) {
  const pageCount = Math.ceil(totalItems / limit);
  const [showError, setShowError] = useState(false);
  return (
    <section aria-label="pagination-section" className="pagination-section">
      <div className="limit-container">
        <label htmlFor="limit-input">per page</label>
        <input
          type="text"
          value={limit}
          className="limit-input"
          onChange={(e) => {
            console.log({ val: e.target.value });
            if (0 <= parseInt(e.target.value, 10) <= 10)
              handleLimitChange(e.target.value);
            else {
              setShowError(true);
            }
          }}
          id="limit-input"
        />
      </div>
      {showError && (
        <span className="error-span">
          Please provide a valid value below or equal to 10
        </span>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={({ selected }) => {
          handlePageClick(selected);
        }}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </section>
  );
}

export default Pagination;
