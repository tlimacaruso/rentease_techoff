const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginbtn');

loginButton.addEventListener('click', function () {
    const email = emailInput.value;
    const password = passwordInput.value;

    const storedUsers = localStorage.getItem('users');

    if (storedUsers) {
        const users = JSON.parse(storedUsers);

        let loggedInUser = null;

        for (let user of users) {

            if (user.email === email && user.password === password) {
                loggedInUser = user;
                break;
            }
        }

        if (loggedInUser){
           localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
           window.location.href='index.html';
        } else{
            alert('Invalid credentials, try again.');
        }
    
    } else{
        alert('No user found! Click the register button.');
    }

});




