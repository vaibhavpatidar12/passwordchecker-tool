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


// 🔐 Real scoring
function checkPassword() {
    let password = document.getElementById("password").value;
    let fill = document.getElementById("strength-fill");
    let text = document.getElementById("strength-text");

    let score = 0;

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
}


// 🔐 Generate
function generatePassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let password = "";

    for (let i = 0; i < 12; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("generatedPassword").innerText = password;
}


// 📋 Copy
function copyPassword() {
    let text = document.getElementById("generatedPassword").innerText;

    if (!text) return alert("Generate password first!");

    navigator.clipboard.writeText(text);
}
