import React from 'react';
import { PaginationPropsInterface } from './interfaces/PaginationPropsInterface';

const Pagination: React.FC<PaginationPropsInterface> = ({
    page,
    setPage,
    hasNextPage,
    hasPreviousPage,
    estatesPerPage,
    setEstatesPerPage,
}) => {
    const handleEstatesPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEstatesPerPage = Number(event.target.value);
        setEstatesPerPage(selectedEstatesPerPage);
        setPage(1); // Reset the page number to 1 when changing the estates per page
    };

    return (
    <div className="pagination">
        <button
            className="previous"
            disabled={!hasPreviousPage}
            onClick={() => setPage(page - 1)}
        >
            Previous
        </button>
        <div className="current-page">{`Page ${page}`}</div>
        <button
            className="next"
            disabled={!hasNextPage}
            onClick={() => setPage(page + 1)}
        >
            Next
        </button>
        <div className="select-wrapper">
            <select value={estatesPerPage} onChange={handleEstatesPerPageChange}>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
                <option value={200}>200 per page</option>
                <option value={500}>500 per page</option>
            </select>
        </div>
    </div>
    );
};

export default Pagination;
