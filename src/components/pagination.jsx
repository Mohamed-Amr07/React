import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationComponent({ currentPage, totalPages, onPageChange }) {

    function handlePageChange(page) {
        onPageChange(page,10);
    }

    function renderPageNumbers() {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                    {i}
                </Pagination.Item>
            );
        }
        return pageNumbers;
    }

    return (
        <Pagination>
            <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
            {renderPageNumbers()}
            <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
        </Pagination>
    );
}

export default PaginationComponent;