const baseUrl = "http://localhost:8080";

//Metod calls to load initial data
const initialPage = 1;

function loadPage(page) {
  const pageSize = 3;
  //Zahtjev ili zaglavlje+tijelo
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  //Primjer http://localhost:8080/api/articles?page=1&pageSize=10
  //Adresa metode ili service metode ili api-ja
  const url = `${baseUrl}/api/articles?page=${page}&pageSize=${pageSize}`;

  fetch(url, request)
    .then((response) => response.json())
    .then(callbackOnArticleLoad)
    .catch((error) => console.log(error));
}

function callbackOnArticleLoad(articles) {
  addArticlesToTableBody(articles);
}

function addArticlesToTableBody(articles) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  for (let article of articles) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${article.id}</td>
            <td>${article.number}</td>
            <td>${article.name}</td>
            <td>${article.description}</td>
            <td>${article.unit_price}</td>
            <td>${article.category}</td>
        `;
    tableBody.appendChild(row);
  }
}

function createPagination(totalPages) {
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.addEventListener("click", () => loadPage(i));
    paginationDiv.appendChild(pageLink);
  }
}

function detectNumberOfPagesAndLoad() {
  const pageSize = 3;

  fetch("http://localhost:8080/api/articles")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const totalArticleNumber = data.length;
      const totalPages = Math.ceil(totalArticleNumber / pageSize);
      createPagination(totalPages);
      loadPage(1);
    })
    .catch((error) => console.log(error));
}


detectNumberOfPagesAndLoad();