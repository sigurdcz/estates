import React from 'react';
import { PaginationPropsInterface } from './interfaces/PaginationPropsInterface';

const Pagination: React.FC<PaginationPropsInterface> = ({
    page,
    setPage,
    hasNextPage,
    hasPreviousPage,
}) => {
    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="pagination">
            <button onClick={handlePreviousPage} disabled={!hasPreviousPage}>
                Previous
            </button>
            <span>{page}</span>
            <button onClick={handleNextPage} disabled={!hasNextPage}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
