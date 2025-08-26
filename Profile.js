document.addEventListener('DOMContentLoaded', (e)=>{
    populateProfileInfo();
});

function getLoggedInUser(){
    const loggedInUserString = localStorage.getItem('loggedInUser');
    if(loggedInUserString){
        return JSON.parse(loggedInUserString);
    } else{
        return null;
    }
}

function populateProfileInfo(){
    const user = getLoggedInUser();

    if (user){
        document.getElementById('user-name').innerHTML = `${user.firstName} ${user.lastName}`;
        document.getElementById('user-dob').innerHTML = `${user.birthdate}`;
        document.getElementById('user-email').innerHTML = `${user.email}`;
        document.getElementById('user-addedflats').innerHTML = `${user.addedflatscount || 'Not available'}`;
    } else{
        alert("You're not logged in");
        window.location.href='Login.html';
    }
}