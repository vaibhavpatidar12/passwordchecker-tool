function checkPassword() {
    let password = document.getElementById("password").value;
    let strengthText = document.getElementById("strength");
    let bar = document.getElementById("strengthFill");

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    if (strength <= 2) {
        strengthText.innerText = "Weak ❌";
        bar.style.width = "33%";
        bar.style.background = "red";
    } else if (strength <= 4) {
        strengthText.innerText = "Medium ⚠️";
        bar.style.width = "66%";
        bar.style.background = "orange";
    } else {
        strengthText.innerText = "Strong 💪";
        bar.style.width = "100%";
        bar.style.background = "green";
    }
}


// 👁️ Toggle Password
function togglePassword() {
    const input = document.getElementById("password");
    const icon = document.querySelector(".eye i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}


// 🔐 Generate Password
function generatePassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";

    for (let i = 0; i < 12; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("generatedPassword").innerText = password;
}


// 📋 Copy Password
function copyPassword() {
    let text = document.getElementById("generatedPassword").innerText;
    navigator.clipboard.writeText(text);
    alert("Copied!");
}


// 🌙 Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
