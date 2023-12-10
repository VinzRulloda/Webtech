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
