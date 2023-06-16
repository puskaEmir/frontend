const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const promise = fetch("http://localhost:8081/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, name, surname }),
  })
  ;
});
