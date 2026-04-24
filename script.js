document.addEventListener("DOMContentLoaded", function () {

    const password = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    // 👁️ Toggle password
    togglePassword.addEventListener("click", function () {
        const type = password.type === "password" ? "text" : "password";
        password.type = type;

        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });

    // 🔥 Live check
    password.addEventListener("input", checkPassword);
});


// 🔐 Strength + Crack Time
function checkPassword() {
    let password = document.getElementById("password").value;
    let fill = document.getElementById("strength-fill");
    let text = document.getElementById("strength-text");
    let crackText = document.getElementById("crack-time");

    let score = 0;
    let charsetSize = 0;

    // Detect character sets
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^A-Za-z0-9]/.test(password)) charsetSize += 32;

    // Score logic
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

    // Crack time
    let guesses = Math.pow(charsetSize, password.length);
    let guessesPerSecond = 1e9;

    let seconds = guesses / guessesPerSecond;

    crackText.innerText = "Estimated Crack Time: " + formatTime(seconds);
}


// ⏳ Format time
function formatTime(seconds) {
    if (!seconds || seconds === Infinity) return "";

    if (seconds < 1) return "Instantly ❌";
    if (seconds < 60) return Math.floor(seconds) + " seconds";
    if (seconds < 3600) return Math.floor(seconds / 60) + " minutes";
    if (seconds < 86400) return Math.floor(seconds / 3600) + " hours";
    if (seconds < 31536000) return Math.floor(seconds / 86400) + " days";
    if (seconds < 3153600000) return Math.floor(seconds / 31536000) + " years";

    return "Millions of years 🚀";
}


// 🔐 Generate Password
function generatePassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let password = "";

    for (let i = 0; i < 12; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("generatedPassword").innerText = password;
}


// 📋 Copy Password
function copyPassword() {
    let text = document.getElementById("generatedPassword").innerText;

    if (!text) return alert("Generate password first!");

    navigator.clipboard.writeText(text);
}
