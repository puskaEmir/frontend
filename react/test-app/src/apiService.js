// apiService.js

const baseUrl = "http://localhost:8080";

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const getRequest = (url) => {
  return fetch(url)
    .then(handleResponse)
    .catch((error) => {
      throw new Error("An error occurred while making the API request.");
    });
};

export const getFilms = (page, pageSize) => {
  const url = `${baseUrl}/api/film?page=${page}&pageSize=${pageSize}`;
  return getRequest(url);
};
