
// html elements
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var loginButton = document.getElementById("loginButton");
var signupNameInput = document.getElementById("signupName");
var signupEmailInput = document.getElementById("signupEmail");
var signupPasswordInput = document.getElementById("signupPassword");
var signupButton = document.getElementById("signupButton");

// variables
var usersList = localStorage.getItem("userList") ? JSON.parse(localStorage.getItem("userList")) : [];

// functions

function addUserInfo(username, useremail, password ) {
    var userinfo = {
        username: signupNameInput.value,
        useremail: signupEmailInput.value,
        password: signupPasswordInput.value
    };
    usersList.push(userinfo);
    localStorage.setItem("userList", JSON.stringify(usersList));
    console.log(usersList);
}
if (signupButton) {
    signupButton.addEventListener("click", addUserInfo);
}

function login(e) {
    if (e && e.preventDefault) e.preventDefault();

    var entered = usernameInput.value.trim();
    var enteredPass = passwordInput.value;

    var msg = document.getElementById("loginForm");
    msg.innerHTML = ""; 

    // validation
    if (!entered && !enteredPass) {
        msg.innerHTML = `<p class="text-danger">Username/Email and Password are required.</p>`;
        return;
    }
    if (!entered) {
        msg.innerHTML = `<p class="text-danger">Username/Email is required.</p>`;
        return;
    }
    if (!enteredPass) {
        msg.innerHTML = `<p class="text-danger">Password is required.</p>`;
        return;
    }

    if (!usersList || usersList.length === 0) {
        msg.innerHTML = `<p class="text-danger">No users found. Please sign up first.</p>`;
        return;
    }

    var success = false;
    var currentUser = null;
    for (var i = 0; i < usersList.length; i++) {
        currentUser = usersList[i];
        
        if ((currentUser.username === entered || currentUser.useremail === entered) && currentUser.password === enteredPass) {
            success = true;
            break;
        }
    }

    if (success) {
        localStorage.setItem("currentUser", currentUser.username);
        window.location.href = "home.html";
    } else {
        msg.innerHTML = `<p class="text-danger">Incorrect email or password.</p>`;
    }
}

function addUserInfo(e) {
    if (e && e.preventDefault) e.preventDefault();

    var nameVal = signupNameInput.value.trim();
    var emailVal = signupEmailInput.value.trim();
    var passVal = signupPasswordInput.value;

    var msg = document.getElementById("exist");
    msg.innerHTML = ""; 

    // Regex patterns
    var namePattern = /^[A-Z][a-zA-Z]*$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passPattern = /^.{8,}$/;

    // validation
    if (!nameVal || !emailVal || !passVal) {
        msg.innerHTML = `<p class="text-danger">All fields are required.</p>`;
        return;
    }
    if (!namePattern.test(nameVal)) {
        msg.innerHTML = `<p class="text-danger">Name must start with a capital letter and contain only letters.</p>`;
        return;
    }
    if (!emailPattern.test(emailVal)) {
        msg.innerHTML = `<p class="text-danger">Please enter a valid email address.</p>`;
        return;
    }
    if (!passPattern.test(passVal)) {
        msg.innerHTML = `<p class="text-danger">Password must be at least 8 characters long.</p>`;
        return;
    }

    var userinfo = {
        username: nameVal,
        useremail: emailVal,
        password: passVal
    };

    usersList.push(userinfo);
    localStorage.setItem("userList", JSON.stringify(usersList));
    console.log(usersList);

    msg.innerHTML = `<p class="text-success">Signup successful! You can now log in.</p>`;
}


if (loginButton) {
    loginButton.addEventListener("click", login);
}

var currentUser = localStorage.getItem("currentUser");
if (currentUser) {
    var userElement = document.getElementsByClassName("username")[0];
    if (userElement) {
        userElement.textContent = currentUser;
    }
}
