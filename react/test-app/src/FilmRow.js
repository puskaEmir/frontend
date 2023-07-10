import React from 'react';

const FilmRow = ({ film }) => {
  return (
    <tr>
      <td>{film.film_id}</td>
      <td>{film.title}</td>
      <td>{film.description}</td>
      <td>{film.release_year}</td>
      <td>{film.length}</td>
      <td>{film.rating}</td>
      <td>{film.special_features}</td>
    </tr>
  );
};

export default FilmRow;
