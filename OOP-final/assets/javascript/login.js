function toggleLoginForm() {
    var loginForm = document.getElementById("loginForm");
    loginForm.classList.toggle("show");

    loginForm.style.display = loginForm.classList.contains("show") ? "block" : "none";

    if (loginForm.classList.contains("show")) {
        loginForm.style.left = "40%";
        loginForm.style.transform = "translateX(-40%)";

        loginForm.style.top = "40%";
        loginForm.style.transform = "translateY(-40%)";

    } else {
        loginForm.style.top = null;
        loginForm.style.left = null;
        loginForm.style.transform = null;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // Check if the 'rememberMe' cookie exists
    var rememberMeChecked = getCookie("rememberMe") === "true";

    // If 'rememberMe' is checked, autofill the username
    if (rememberMeChecked) {
        var storedUsername = getCookie("username");
        if (storedUsername) {
            document.getElementById('username').value = storedUsername;
        }
    }

    // Check the 'Remember Me' checkbox if needed
    document.getElementById('rememberMe').checked = rememberMeChecked;
});

// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to get the value of a cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// Add an event listener to handle changes in the 'Remember Me' checkbox
document.getElementById('rememberMe').addEventListener('change', function () {
    // Save the state of 'Remember Me' checkbox in a cookie
    setCookie("rememberMe", this.checked, 365);

    // If the checkbox is checked, save the username in a cookie
    if (this.checked) {
        var username = document.getElementById('username').value;
        setCookie("username", username, 365);
    } else {
        // If the checkbox is unchecked, clear the username cookie
        setCookie("username", "", -1);
    }
});
