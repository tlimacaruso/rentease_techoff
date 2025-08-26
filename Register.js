const registerBtn = document.getElementById('registerbtn')
const emailInput = document.getElementById("email");
const firstNameInput = document.getElementById("registerfirstname");
const lastNameInput = document.getElementById("registerlastname");
const birthInput = document.getElementById("birthdate");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmpassword");

registerbtn.addEventListener('click', function () {
    const email = emailInput.value;
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const birthdate = birthInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert('Make sure both password fields are the same');
        return;
    }

    const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        password: password,
        addedflatscount: 0 
    };

    const storedUsers = localStorage.getItem('users');
    let users = storedUsers ? JSON.parse(storedUsers) : [];

    users.push(userData);

    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered!');

    window.location.href = 'Login.html';

})


