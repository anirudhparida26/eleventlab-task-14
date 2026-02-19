

const form = document.getElementById("authForm");
const message = document.getElementById("message");
const toggleLink = document.getElementById("toggleLink");
const toggleText = document.getElementById("toggleText");
const formTitle = document.getElementById("formTitle");

let isLoginMode = true;


toggleLink.addEventListener("click", () => {
    isLoginMode = !isLoginMode;

    formTitle.textContent = isLoginMode ? "Login" : "Register";
    toggleText.textContent = isLoginMode
        ? "Don't have an account?"
        : "Already have an account?";
    toggleLink.textContent = isLoginMode ? "Register" : "Login";
    message.textContent = "";
});

// Handle Form Submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (isLoginMode) {
        loginUser(email, password);
    } else {
        registerUser(email, password);
    }
});

// Register Function
function registerUser(email, password) {
    if (localStorage.getItem(email)) {
        message.style.color = "red";
        message.textContent = "User already exists!";
        return;
    }

    const userData = {
        email: email,
        password: password 
    };

    localStorage.setItem(email, JSON.stringify(userData));

    message.style.color = "green";
    message.textContent = "Registration successful! Please login.";
}

// Login Function
function loginUser(email, password) {
    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
        message.style.color = "red";
        message.textContent = "User not found!";
        return;
    }

    const userData = JSON.parse(storedUser);

    if (userData.password === password) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        message.style.color = "red";
        message.textContent = "Invalid credentials!";
    }
}
