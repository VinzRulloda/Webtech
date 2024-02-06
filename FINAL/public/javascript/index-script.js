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

function showForgotPassword() {
    alert("Contact your administrator");
}

const form = document.getElementById('login');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(form);
  const searchParams = new URLSearchParams(formData);
  try {
    const res = await fetch(
      '/login',
      {
        method: 'POST',
        body: searchParams,
        cache: "no-cache",
      },
    );

    const {success, message, endpoint} = await res.json();
    
    if (success) {
        console.log(success);
        window.location.replace(endpoint);
    } else {
        alert(message);
    }
    
  } catch (err) {
    alert(err.message);
  }
});