import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
const Pagination = ({ onChangePage, currentPage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(event) => onChangePage(event.selected + 1)}
			pageRangeDisplayed={8}
			forcePage={currentPage - 1}
			pageCount={3}
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
