const baseUrl = 'http://localhost:8080';
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", callbackOnLogin);
function callbackOnLogin(event){
    event.preventDefault();
    const usernameInput = document.getElementById('usernameInput').value;
    const passwordInput = document.getElementById('passwordInput').value;
    //adresa backend metode
    const backendLoginServiceMethodAddress = `${baseUrl}/api/login`;
    //zahtjev request -> http zahtjev -> zaglavlje + tijelo (header + body)
    const httpRequest = {
        method: 'POST', 
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({usernameInput, passwordInput})
    };

    fetch(backendLoginServiceMethodAddress, httpRequest)
    .then(response =>{
        if(response.ok){
            alert('Logovan si u aplikaciju');
        }else{
            alert('Nisi logovan')
        }
    }).catch(error =>{
        alert(`${error}`);
    });
}
