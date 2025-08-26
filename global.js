
populateUserInfo();

function populateUserInfo(){
    const user = getLoggedInUser();

    if(user){
        document.getElementById('user-intro').innerHTML = `Hello, <b>${user.firstName} ${user.lastName}</b>`;

    }
}

function getLoggedInUser(){
    const loggedInUserString = localStorage.getItem('loggedInUser');
    if (loggedInUserString) {
        return JSON.parse(loggedInUserString);
    } else {
        return null;
    }
}

function isLoggedIn(){
    return getLoggedInUser() !== null;
}




const logoutButton = document.getElementById('logoutBtn');

logoutButton.addEventListener('click', (e) =>{
    e.preventDefault();
    localStorage.removeItem('loggedInUser');
    window.location.href='Login.html';
})



