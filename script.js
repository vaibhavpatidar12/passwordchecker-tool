document.addEventListener("DOMContentLoaded", () => {

    const passwordInput =
        document.getElementById("password");

    const togglePassword =
        document.getElementById("togglePassword");

    // Show / Hide Password

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

    passwordInput.addEventListener(
        "input",
        checkPassword
    );
});


// Password Strength Checker

function checkPassword(){

    let password =
        document.getElementById("password").value;

    let fill =
        document.getElementById("strength-fill");

    let text =
        document.getElementById("strength-text");

    let crack =
        document.getElementById("crack-time");

    let score = 0;
    let charset = 0;

    const length =
        document.getElementById("length");

    const upper =
        document.getElementById("upper");

    const number =
        document.getElementById("number");

    const special =
        document.getElementById("special");



    if(password.length >= 8){

        score += 25;

        length.innerHTML =
        "✅ Minimum 8 characters";

    }else{

        length.innerHTML =
        "❌ Minimum 8 characters";
    }


    if(/[A-Z]/.test(password)){

        score += 25;
        charset += 26;

        upper.innerHTML =
        "✅ Uppercase Letter";

    }else{

        upper.innerHTML =
        "❌ Uppercase Letter";
    }


    if(/[0-9]/.test(password)){

        score += 25;
        charset += 10;

        number.innerHTML =
        "✅ Number";

    }else{

        number.innerHTML =
        "❌ Number";
    }


    if(/[^A-Za-z0-9]/.test(password)){

        score += 25;
        charset += 32;

        special.innerHTML =
        "✅ Special Character";

    }else{

        special.innerHTML =
        "❌ Special Character";
    }


    fill.style.width = score + "%";


    if(score <= 25){

        fill.style.background = "#ef4444";

        text.innerHTML =
        "<b>Password Strength:</b> Weak";

    }

    else if(score <= 75){

        fill.style.background = "#f59e0b";

        text.innerHTML =
        "<b>Password Strength:</b> Medium";

    }

    else{

        fill.style.background = "#22c55e";

        text.innerHTML =
        "<b>Password Strength:</b> Strong";
    }


    let guesses =
        Math.pow(charset || 1,
        password.length);

    let seconds =
        guesses / 1000000000;

    crack.innerHTML =
    "<b>Estimated Crack Time:</b> "
    + formatTime(seconds);
}



// Crack Time

function formatTime(seconds){

    if(seconds < 1)
        return "Instantly";

    if(seconds < 60)
        return Math.floor(seconds)
        + " Seconds";

    if(seconds < 3600)
        return Math.floor(seconds/60)
        + " Minutes";

    if(seconds < 86400)
        return Math.floor(seconds/3600)
        + " Hours";

    if(seconds < 31536000)
        return Math.floor(seconds/86400)
        + " Days";

    if(seconds < 31536000000)
        return Math.floor(seconds/31536000)
        + " Years";

    return "Millions of Years";
}



// Password Generator

function generatePassword(){

    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz" +
    "0123456789" +
    "!@#$%^&*()_+";

    let password = "";

    for(let i=0;i<12;i++){

        password += chars.charAt(
        Math.floor(
        Math.random() *
        chars.length));
    }

    document.getElementById(
    "generatedPassword")
    .innerText = password;
}



// Copy Password

function copyPassword(){

    let password =
    document.getElementById(
    "generatedPassword")
    .innerText;

    if(!password){

        alert(
        "Generate Password First!");
        return;
    }

    navigator.clipboard.writeText(
    password);

    alert(
    "Password Copied Successfully!");
}
