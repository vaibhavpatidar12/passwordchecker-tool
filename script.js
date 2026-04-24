// Wait until page loads (IMPORTANT FIX)
document.addEventListener("DOMContentLoaded", function () {

    const togglePassword = document.getElementById("togglePassword");
    const password = document.getElementById("password");

    // 👁️ Toggle password
    togglePassword.addEventListener("click", function () {
        const type = password.type === "password" ? "text" : "password";
        password.type = type;

        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });

});


// 🔐 Password strength
function checkPassword() {
    let password = document.getElementById("password").value;
    let strengthText = document.getElementById("strength");

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;

    if (strength === 3) {
        strengthText.innerText = "Strong";
    } else if (strength === 2) {
        strengthText.innerText = "Medium";
    } else {
        strengthText.innerText = "Weak";
    }
}


// 🔐 Generate password
function generatePassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";

    for (let i = 0; i < 10; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("generatedPassword").innerText = password;
}


// 📋 COPY FIXED
function copyPassword() {
    let text = document.getElementById("generatedPassword").innerText;

    if (!text) {
        alert("Generate password first!");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => alert("Copied!"))
        .catch(() => alert("Copy failed"));
}
