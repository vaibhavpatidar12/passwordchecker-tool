document.addEventListener("DOMContentLoaded", function () {

    const password = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const darkToggle = document.getElementById("darkModeToggle");

    // 👁️ Toggle password
    togglePassword.addEventListener("click", function () {
        password.type = password.type === "password" ? "text" : "password";
        this.classList.toggle("fa-eye-slash");
    });

    // 🌙 Dark mode toggle
    darkToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark");
    });

    password.addEventListener("input", checkPassword);
});


// 🔐 Strength + Crack Time
function checkPassword() {
    let password = document.getElementById("password").value;
    let fill = document.getElementById("strength-fill");
    let text = document.getElementById("strength-text");
    let crackText = document.getElementById("crack-time");

    let score = 0;
    let charset = 0;

    if (/[a-z]/.test(password)) charset += 26;
    if (/[A-Z]/.test(password)) charset += 26;
    if (/[0-9]/.test(password)) charset += 10;
    if (/[^A-Za-z0-9]/.test(password)) charset += 32;

    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;

    fill.style.width = score + "%";

    if (score < 40) {
        fill.style.background = "red";
        text.innerText = "Weak";
    } else if (score < 70) {
        fill.style.background = "orange";
        text.innerText = "Medium";
    } else {
        fill.style.background = "green";
        text.innerText = "Strong";
    }

    let guesses = Math.pow(charset, password.length);
    let seconds = guesses / 1e9;

    crackText.innerText = "Crack Time: " + formatTime(seconds);
}


// ⏳ Format
function formatTime(seconds) {
    if (!seconds || seconds === Infinity) return "";

    if (seconds < 1) return "Instantly";
    if (seconds < 60) return Math.floor(seconds) + " sec";
    if (seconds < 3600) return Math.floor(seconds/60) + " min";
    if (seconds < 86400) return Math.floor(seconds/3600) + " hrs";
    if (seconds < 31536000) return Math.floor(seconds/86400) + " days";

    return "Years+ 🚀";
}


// 🔐 Generate
function generatePassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let pass = "";

    for (let i = 0; i < 12; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("generatedPassword").innerText = pass;
}


// 📋 Copy
function copyPassword() {
    let text = document.getElementById("generatedPassword").innerText;
    if (!text) return alert("Generate password first!");

    navigator.clipboard.writeText(text);
}
