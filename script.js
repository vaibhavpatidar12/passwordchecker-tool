document.addEventListener("DOMContentLoaded", () => {

    const passwordInput =
    document.getElementById("password");

    const togglePassword =
    document.getElementById("togglePassword");

    togglePassword.addEventListener("click", () => {

        if(passwordInput.type === "password"){

            passwordInput.type = "text";

            togglePassword.classList.replace(
            "fa-eye",
            "fa-eye-slash");

        }else{

            passwordInput.type = "password";

            togglePassword.classList.replace(
            "fa-eye-slash",
            "fa-eye");
        }
    });

    passwordInput.addEventListener(
    "input",
    checkPassword);

});


function checkPassword(){

    let password =
    document.getElementById("password").value;

    let fill =
    document.getElementById("strength-fill");

    let text =
    document.getElementById("strength-text");

    let score = 0;

    if(password.length >= 8)
        score += 25;

    if(/[A-Z]/.test(password))
        score += 25;

    if(/[0-9]/.test(password))
        score += 25;

    if(/[^A-Za-z0-9]/.test(password))
        score += 25;

    fill.style.width = score + "%";

    if(score <= 25){

        fill.style.background =
        "#ef4444";

        text.innerHTML =
        "Password Strength: Weak";
    }

    else if(score <= 75){

        fill.style.background =
        "#f59e0b";

        text.innerHTML =
        "Password Strength: Medium";
    }

    else{

        fill.style.background =
        "#10B981";

        text.innerHTML =
        "Password Strength: Strong";
    }
}


function generatePassword(){

    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let password = "";

    for(let i=0;i<12;i++){

        password += chars.charAt(
        Math.floor(
        Math.random()*chars.length));
    }

    document.getElementById(
    "generatedPassword")
    .innerText = password;
}


function copyPassword(){

    let password =
    document.getElementById(
    "generatedPassword")
    .innerText;

    navigator.clipboard.writeText(
    password);

    alert("Password Copied!");
}
