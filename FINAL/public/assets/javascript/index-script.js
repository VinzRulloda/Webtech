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

function errorLogin() {
    var errorMessage = document.createElement("div");
    errorMessage.textContent = "Incorrect Username/Password! Try Again";
    errorMessage.style.position = "fixed";
    errorMessage.style.top = "50%";
    errorMessage.style.left = "50%";
    errorMessage.style.transform = "translate(-50%, -50%)";
    errorMessage.style.backgroundColor = "#f8d7da";
    errorMessage.style.color = "#721c24";
    errorMessage.style.border = "1px solid #f5c6cb";
    errorMessage.style.padding = "15px";
    errorMessage.style.borderRadius = "5px";
    errorMessage.style.zIndex = "1000";
    errorMessage.style.cursor = "pointer";
    document.body.appendChild(errorMessage);

    errorMessage.addEventListener("click", function() {
        errorMessage.style.display = "none";
    })
}

function updateTimestamp() {
    var video = document.getElementById('vidPlayer');
    localStorage.setItem('videoTimestamp', video.currentTime);
}

function setVideoTimestamp() {
    var video = document.getElementById('vidPlayer');
    var timestamp = localStorage.getItem('videoTimestamp');
    if (timestamp) {
        video.currentTime = parseFloat(timestamp);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('vidPlayer').addEventListener('timeupdate', updateTimestamp);
    window.onload = setVideoTimestamp;

    var video = document.getElementById("vidPlayer")
    video.play();
  
    video.addEventListener("ended", function () {
      video.src = "assets/videos/sample2.mp4"

      video.onload();
  
      video.play();
    })
  })

document.addEventListener("DOMContentLoaded", function () {
    
    var rememberMeChecked = getCookie("rememberMe") === "true";

    if (rememberMeChecked) {
        var storedUsername = getCookie("username");
        var storedPassword = getCookie("password");

        if (storedUsername && storedPassword) {
            document.getElementById('username').value = storedUsername;
            document.getElementById('password').value = storedPassword;
        }
    }

    document.getElementById('rememberMe').checked = rememberMeChecked;
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

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

function showForgotPassword() {
    alert("Contact your administrator");
}