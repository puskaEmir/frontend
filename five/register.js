//Bazna ADRESA mog backend servisa
const baseUrl = "http://localhost:8080/api";
//Pristupanje dokumentu s kojim sa povezan i pronalazk html elementa
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", callbackOnRegister);

function callbackOnRegister(event) {
  event.preventDefault();
  const nameInput = document.getElementById("nameInput").value;
  const surnameInput = document.getElementById("surnameInput").value;
  const usernameInput = document.getElementById("usernameInput").value;
  const emailInput = document.getElementById("emailInput").value;
  const passwordInput = document.getElementById("passwordInput").value;
  const confirmPasswordInput = document.getElementById(
    "confirmPasswordInput"
  ).value;
  if (passwordInput != confirmPasswordInput) {
    document.getElementById("confirmLabelMessage").innerHTML =
      "Jednostavno moraš unijesti 2x isti password";
  } else {
    document.getElementById("confirmLabelMessage").innerHTML = "";
    submitRegisterData(
      nameInput,
      surnameInput,
      usernameInput,
      emailInput,
      passwordInput
    );
  }
}

function submitRegisterData(
  nameInput,
  surnameInput,
  usernameInput,
  emailInput,
  passwordInput
) {
  //zahtjev ili request -> header + body (zaglavlje + tijelo)
  const registerRequestParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nameInput,
      surnameInput,
      usernameInput,
      emailInput,
      passwordInput,
    }),
  };
  //adresu na koju šaljemo zahtjev
  const urlAddress = `${baseUrl}/register`;
  //šaljemo podatke na servis /register
  fetch(urlAddress, registerRequestParams)
    .then((response) => {
        if(response.ok){
            alert('Uspješno logovan');
        }else{
            alert('Neuspješno logovan');
        }
    })
    .catch((error) => {
        alert(`${error}`);
    });
}


function callbackOnRegisterResponse(response){

}

function callbackOnRegisterError(error){
    
}
