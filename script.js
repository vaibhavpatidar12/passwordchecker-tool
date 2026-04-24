function checkPassword() {
    let password = document.getElementById("password").value;
    let strengthText = document.getElementById("strength");
    let suggestionsList = document.getElementById("suggestions");
    let crackTimeText = document.getElementById("crackTime");

    let strength = 0;
    let suggestions = [];

    if (password.length >= 8) strength++;
    else suggestions.push("At least 8 characters");

    if (/[A-Z]/.test(password)) strength++;
    else suggestions.push("Add uppercase letter");

    if (/[a-z]/.test(password)) strength++;
    else suggestions.push("Add lowercase letter");

    if (/[0-9]/.test(password)) strength++;
    else suggestions.push("Add a number");

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    else suggestions.push("Add special character");

    if (strength === 5) {
        strengthText.innerText = "Strong 💪";
        strengthText.style.color = "green";
    } else if (strength >= 3) {
        strengthText.innerText = "Medium ⚠️";
        strengthText.style.color = "orange";
    } else {
        strengthText.innerText = "Weak ❌";
        strengthText.style.color = "red";
    }

    suggestionsList.innerHTML = "";
    suggestions.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        suggestionsList.appendChild(li);
    });

    let crackTime = estimateCrackTime(password);
    crackTimeText.innerText = "⏳ Estimated Crack Time: " + crackTime;
}


// 👁️ Show/Hide Password
function togglePassword() {
    let input = document.getElementById("password");
    let eye = document.querySelector(".eye");

    if (input.type === "password") {
        input.type = "text";
        eye.innerText = "🙈";
    } else {
        input.type = "password";
        eye.innerText = "👁️";
    }
}


// 🔐 Generate Password
function generatePassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";

    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById("generatedPassword").innerText = password;
}


// ⏳ Crack Time
function estimateCrackTime(password) {
    let length = password.length;

    if (length === 0) return "";
    if (length < 6) return "Instantly ❌";
    if (length < 8) return "Few minutes ⚠️";
    if (length < 10) return "Few hours";
    if (length < 12) return "Few days";
    if (length < 14) return "Years";
    return "Millions of years 🚀";
}
