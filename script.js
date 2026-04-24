// 👁️ Toggle Password
document.addEventListener("DOMContentLoaded", function () {
    const togglePassword = document.getElementById("togglePassword");
    const password = document.getElementById("password");

    togglePassword.addEventListener("click", function () {
        const type = password.type === "password" ? "text" : "password";
        password.type = type;

        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });
});


// 🔐 Strength Check
function checkPassword() {
    let password = document.getElementById("password").value;
    let strength = document.getElementById("strength");

    if (password.length < 6) {
        strength.innerText = "Weak";
        strength.style.color = "#ff4d4d";
    } else if (password.length < 10) {
        strength.innerText = "Medium";
        strength.style.color = "#ffc107";
    } else {
        strength.innerText = "Strong";
        strength.style.color = "#4caf50";
    }
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

    if (!text) {
        alert("Generate password first!");
        return;
    }

    navigator.clipboard.writeText(text);
}
