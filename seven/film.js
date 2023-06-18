const baseUrl = "http://localhost:8081";

//Metod calls to load initial data
const initialPage = 1;
let pageCount;



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


let start;
let end;
let numberOfShownPageButtons = 10;

function createPagination(totalPages) {
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";
  start = start ? start : 1;
  end = end ? end : numberOfShownPageButtons;
  end = end > totalPages ? totalPages : end;
  console.log(totalPages);
  console.log(`Range ${start} -  ${end}`);
  if (start > numberOfShownPageButtons) {
    const pageLink = document.createElement("a");
    pageLink.textContent = "<<";
    pageLink.addEventListener("click", () => {
      start = start - numberOfShownPageButtons;
      end = end - numberOfShownPageButtons;
      end = totalPages < end ? totalPages : end;
      createPagination(totalPages)
    }
    );
    paginationDiv.appendChild(pageLink);
  }
  for (let i = start; i <= end; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.addEventListener("click", () => loadPage(i, pageSizeInput.value));
    paginationDiv.appendChild(pageLink);
  }
  if (end < totalPages) {
    const pageLink = document.createElement("a");
    pageLink.textContent = ">>";
    pageLink.addEventListener("click", () => {
      start = start + numberOfShownPageButtons;
      end = end + numberOfShownPageButtons;
      end = totalPages < end ? totalPages : end;
      createPagination(totalPages)
    }
    );
    paginationDiv.appendChild(pageLink);
  }
}


const pageSizeInput = document.querySelector("#pageSizeInput");
pageSizeInput.addEventListener("change", () => {
  start = 1; 
  end = 10;
  loadPage(1, pageSizeInput.value);
});

loadPage(1, pageSizeInput.value);
