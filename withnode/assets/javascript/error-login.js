window.onload = function() {
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