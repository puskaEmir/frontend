const baseUrl = "http://localhost:8081";

//Metod calls to load initial data
const initialPage = 1;
let pageCount;
let firstVisibleButton = 1;
let lastVisibleButton = 10;

function loadPage(page, pageSize) {
  const adresa = `${baseUrl}/api/film?page=${page}&pageSize=${pageSize}`;
  const zahtjev = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const promise = fetch(adresa, zahtjev);
  promise
    .then((response) => response.json())
    .catch((error) => alert(error))
    .then(handlePage)
    .catch((error) => alert(error));
}

function handlePage(pageData) {
  //pageCount i items
  addFilmsToTableBody(pageData.items);
  pageCount = pageData.pageCount;
  createPagination(pageCount);
}

function addFilmsToTableBody(films) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  for (let film of films) {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td>${film.film_id}</td>
              <td>${film.title}</td>
              <td>${film.description}</td>
              <td>${film.length}</td>
              <td>${film.release_year}</td>
              <td>${film.special_features}</td>
          `;
    tableBody.appendChild(row);
  }
}

function createPagination(totalPages) {
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";
  const max = lastVisibleButton > totalPages ? totalPages : lastVisibleButton;
  for (let i = 1; i <= max; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.addEventListener("click", () => loadPage(i, pageSizeInput.value));
    paginationDiv.appendChild(pageLink);
  }
  if (lastVisibleButton < totalPages) {
    const pageLink = document.createElement("a");
    pageLink.textContent = ">>";
    const start = max + 1; //11
    firstVisibleButton = start;
    let end = max + 10; //20
    console.log(end);
    if (end > totalPages) {
      end = totalPages;
    }
    lastVisibleButton = end;
    pageLink.addEventListener("click", () =>
      createNewPagination(start, end, totalPages)
    );
    paginationDiv.appendChild(pageLink);
  }
}

function createNewPagination(start, end, totalPages) {
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";
  for (let i = start; i <= end; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.addEventListener("click", () => loadPage(i, pageSizeInput.value));
    paginationDiv.appendChild(pageLink);
  }

  const pageLink = document.createElement("a");
  pageLink.textContent = ">>";
  const min = end + 1; //11
  firstVisibleButton = start;
  let max = end + 10; //20
  console.log(end);
  if (max > totalPages) {
    max = totalPages;
  }
  lastVisibleButton = end;
  pageLink.addEventListener("click", () => createNewPagination(min, max));
  paginationDiv.appendChild(pageLink);
}

const pageSizeInput = document.querySelector("#pageSizeInput");
pageSizeInput.addEventListener("change", () => {
  console.log(pageSizeInput.value);
  console.log(`Previous page count ${pageCount}`);
  loadPage(1, pageSizeInput.value);
});

loadPage(1, pageSizeInput.value);
