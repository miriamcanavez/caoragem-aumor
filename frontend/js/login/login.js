document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const errorMsg = document.getElementById("error-message");

    const userCorreto = "admin";
    const passCorreto = "123";

    if (username.value !== userCorreto || password.value !== passCorreto) {

        errorMsg.style.display = "block";

        username.classList.add("error");
        password.classList.add("error");

        return; // impede continuar
    }

    errorMsg.style.display = "none";
    username.classList.remove("error");
    password.classList.remove("error");

    alert("Login correto!");
});
