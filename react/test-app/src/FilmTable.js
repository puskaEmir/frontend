import React, { useEffect, useState } from 'react';
import FilmRow from './FilmRow';
import Pagination from './Pagination';
import { getFilms } from './apiService';

const FilmTable = () => {
  const [films, setFilms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadPage(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const loadPage = (page, pageSize) => {
    getFilms(page, pageSize)
      .then(handleFilmPage)
      .catch((error) => alert(error.message));
  };

  const handleFilmPage = (filmPageResponse) => {
    setFilms(filmPageResponse.items);
    setTotalPages(filmPageResponse.totalPages);
  };

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = event.target.value;
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return (
    <div>
      <label htmlFor="pageSizeInput" style={{ margin: 10 }}>
        Choose number of films per page:
      </label>
      <select
        id="pageSizeInput"
        name="pageSizeInput"
        onChange={handlePageSizeChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <table className="table table-striped table-hover m-3">
        <thead>
          <tr>
            <th scope="col">Film ID</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Release Year</th>
            <th scope="col">Length</th>
            <th scope="col">Rating</th>
            <th scope="col">Special Features</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <FilmRow key={film.film_id} film={film} />
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPageNumber={totalPages}
        onPageClick={handlePaginationClick}
      />
    </div>
  );
};

export default FilmTable;
