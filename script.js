document.addEventListener("DOMContentLoaded", () => {

    const passwordInput =
    document.getElementById("password");

    const togglePassword =
    document.getElementById("togglePassword");

    const themeToggle =
    document.getElementById("themeToggle");

    /* Show Password */

    togglePassword.addEventListener("click", () => {

        if(passwordInput.type === "password"){

            passwordInput.type = "text";

            togglePassword.classList.replace(
                "fa-eye",
                "fa-eye-slash"
            );

        }else{

            passwordInput.type = "password";

            togglePassword.classList.replace(
                "fa-eye-slash",
                "fa-eye"
            );
        }

    });

    /* Password Strength */

    passwordInput.addEventListener(
        "input",
        checkPassword
    );

    /* Theme Toggle */

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            themeToggle.classList.remove("fa-moon");
            themeToggle.classList.add("fa-sun");

        }else{

            themeToggle.classList.remove("fa-sun");
            themeToggle.classList.add("fa-moon");
        }

    });

});

function checkPassword(){

    const password =
    document.getElementById("password").value;

    const fill =
    document.getElementById("strength-fill");

    const text =
    document.getElementById("strength-text");

    let score = 0;

    if(password.length >= 8) score += 25;
    if(/[A-Z]/.test(password)) score += 25;
    if(/[0-9]/.test(password)) score += 25;
    if(/[^A-Za-z0-9]/.test(password)) score += 25;

    fill.style.width = score + "%";

    if(score <= 25){

        fill.style.background = "red";
        text.innerHTML = "Password Strength: Weak";

    }else if(score <= 75){

        fill.style.background = "orange";
        text.innerHTML = "Password Strength: Medium";

    }else{

        fill.style.background = "green";
        text.innerHTML = "Password Strength: Strong";
    }

}

function generatePassword(){

    const word =
    document.getElementById("customWord")
    .value.trim();

    const type =
    document.getElementById("passwordType")
    .value;

    const special =
    "!@#$%^&*";

    const randomNum =
    Math.floor(100 + Math.random()*900);

    const randomChar =
    String.fromCharCode(
        65 + Math.floor(Math.random()*26)
    );

    let password = "";

    if(type === "easy"){

        password =
        (word || "User") +
        randomNum;

    }

    else if(type === "strong"){

        password =
        (word || "User") +
        special[Math.floor(Math.random()*special.length)] +
        randomNum;

    }

    else{

        password =
        (word || "User") +
        special[Math.floor(Math.random()*special.length)] +
        randomNum +
        randomChar +
        special[Math.floor(Math.random()*special.length)];

    }

    document.getElementById(
        "generatedPassword"
    ).innerText = password;
}

function copyPassword(){

    const password =
    document.getElementById(
        "generatedPassword"
    ).innerText;

    navigator.clipboard.writeText(
        password
    );

    alert("Password Copied!");
}
