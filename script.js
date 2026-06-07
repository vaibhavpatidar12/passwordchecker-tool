// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const passwordField = document.getElementById('password');
    const togglePwBtn = document.getElementById('togglePassword');
    const themeToggleBtn = document.getElementById('themeToggle');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    const loginForm = document.getElementById('loginForm');
    
    // Generator elements - FIXED: Make sure these exist
    const customWordInput = document.getElementById('customWord');
    const generateCustomBtn = document.getElementById('generateCustomBtn');
    const generateRandomBtn = document.getElementById('generateRandomBtn');
    const generatedPasswordSpan = document.getElementById('generatedPassword');
    const copyIcon = document.getElementById('copyPasswordIcon');

    // Helper: Custom toast notification
    function showToastMessage(message, isError = false) {
        const existingToast = document.querySelector('.alert-toast');
        if(existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'alert-toast';
        toast.style.background = isError ? '#b91c1c' : '#1f3a5f';
        toast.style.color = '#fff';
        toast.style.fontWeight = '500';
        toast.innerHTML = `<i class="fa-solid ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'}" style="margin-right: 8px;"></i> ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if(toast && toast.remove) toast.remove();
        }, 2200);
    }

    // ----- PASSWORD STRENGTH CHECKER -----
    function checkPasswordStrength() {
        const password = passwordField.value;
        let score = 0;
        
        if(!password) {
            strengthFill.style.width = '0%';
            strengthFill.style.background = '#e2e8f0';
            strengthText.innerHTML = '🔒 Password Strength';
            return;
        }
        
        // Length criteria
        if(password.length >= 8) score += 20;
        if(password.length >= 12) score += 10;
        
        // Character variety
        if(/[A-Z]/.test(password)) score += 20;
        if(/[a-z]/.test(password)) score += 10;
        if(/[0-9]/.test(password)) score += 20;
        if(/[^A-Za-z0-9]/.test(password)) score += 25;
        
        // Bonus for multiple character types
        let typesCount = 0;
        if(/[A-Z]/.test(password)) typesCount++;
        if(/[a-z]/.test(password)) typesCount++;
        if(/[0-9]/.test(password)) typesCount++;
        if(/[^A-Za-z0-9]/.test(password)) typesCount++;
        if(typesCount >= 3 && password.length >= 8) score += 5;
        
        score = Math.min(score, 100);
        strengthFill.style.width = score + '%';
        
        if(score <= 30) {
            strengthFill.style.background = '#ef4444';
            strengthText.innerHTML = '❌ Weak Password — easy to guess';
        } else if(score <= 65) {
            strengthFill.style.background = '#f97316';
            strengthText.innerHTML = '⚠️ Medium Password — could be stronger';
        } else {
            strengthFill.style.background = '#22c55e';
            strengthText.innerHTML = '✅ Strong Password — excellent!';
        }
    }

    // ----- GENERATE FROM CUSTOM WORD (FIXED) -----
    window.generateCustomPassword = function() {
        console.log("generateCustomPassword called"); // Debug log
        
        const nameInput = document.getElementById('customWord');
        if(!nameInput) {
            console.error("customWord input not found!");
            return;
        }
        
        const name = nameInput.value.trim();
        
        if(name === "") {
            showToastMessage("Please enter a name or word first!", true);
            return;
        }

        const symbols = "!@#$%^&*";
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Create a more complex password
        const password = name.charAt(0).toUpperCase() + name.slice(1) + randomSymbol + randomNumber + symbols[Math.floor(Math.random() * symbols.length)];
        
        const generatedPasswordSpan = document.getElementById('generatedPassword');
        if(generatedPasswordSpan) {
            generatedPasswordSpan.innerText = password;
            showToastMessage("Custom password generated successfully!", false);
        } else {
            console.error("generatedPassword span not found!");
        }
    }

    // ----- GENERATE RANDOM PASSWORD (FIXED) -----
    window.generateRandomPassword = function() {
        console.log("generateRandomPassword called"); // Debug log
        
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let password = "";

        for(let i = 0; i < 14; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        const generatedPasswordSpan = document.getElementById('generatedPassword');
        if(generatedPasswordSpan) {
            generatedPasswordSpan.innerText = password;
            showToastMessage("Random strong password generated!", false);
        } else {
            console.error("generatedPassword span not found!");
        }
    }

    // ----- COPY PASSWORD (FIXED) -----
    window.copyPassword = function() {
        console.log("copyPassword called"); // Debug log
        
        const generatedPasswordSpan = document.getElementById('generatedPassword');
        if(!generatedPasswordSpan) {
            console.error("generatedPassword span not found!");
            return;
        }
        
        const password = generatedPasswordSpan.innerText;
        
        if(password === "Generated Password Appears Here" || password === "✨ Click a button to generate password") {
            showToastMessage("Nothing to copy! Generate a password first.", true);
            return;
        }
        
        navigator.clipboard.writeText(password).then(() => {
            showToastMessage("Password copied to clipboard!", false);
        }).catch(() => {
            showToastMessage("Failed to copy password!", true);
        });
    }

    // ----- TOGGLE PASSWORD VISIBILITY -----
    window.togglePasswordField = function() {
        const passwordInput = document.getElementById('password');
        const toggleIcon = document.getElementById('togglePassword');
        
        if(passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleIcon.classList.remove("fa-eye");
            toggleIcon.classList.add("fa-eye-slash");
        } else {
            passwordInput.type = "password";
            toggleIcon.classList.remove("fa-eye-slash");
            toggleIcon.classList.add("fa-eye");
        }
    }

    // ----- THEME TOGGLE -----
    window.toggleThemeMode = function() {
        document.body.classList.toggle("dark");
        const themeIcon = document.getElementById('themeToggle');
        
        if(document.body.classList.contains("dark")) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            localStorage.setItem('theme', 'light');
        }
    }

    // ----- LOGIN HANDLER -----
    window.handleLogin = function(event) {
        event.preventDefault();
        
        const username = document.querySelector('#loginForm input[type="text"]')?.value;
        const password = document.getElementById('password')?.value;
        
        if(!username || username.trim() === "") {
            showToastMessage("Please enter username or email", true);
            return;
        }
        
        if(!password || password.trim() === "") {
            showToastMessage("Please enter password", true);
            return;
        }
        
        showToastMessage(`Welcome ${username}! Login successful (demo)`, false);
    }

    // ----- SETUP EVENT LISTENERS -----
    function setupEventListeners() {
        // Password strength checker
        if(passwordField) {
            passwordField.addEventListener('input', checkPasswordStrength);
        }
        
        // Toggle password visibility
        const togglePasswordBtn = document.getElementById('togglePassword');
        if(togglePasswordBtn) {
            togglePasswordBtn.addEventListener('click', window.togglePasswordField);
        }
        
        // Theme toggle
        if(themeToggleBtn) {
            themeToggleBtn.addEventListener('click', window.toggleThemeMode);
        }
        
        // Login form
        if(loginForm) {
            loginForm.addEventListener('submit', window.handleLogin);
        }
        
        // Generator buttons - Using onclick attributes (most reliable)
        // The buttons already have onclick in HTML, so we don't need to add listeners
        // But let's ensure the functions are globally available (they are with window.)
        
        console.log("Event listeners setup complete");
        console.log("Generate Custom Button exists:", !!document.querySelector('[onclick="generateCustomPassword()"]'));
        console.log("Generate Random Button exists:", !!document.querySelector('[onclick="generateRandomPassword()"]'));
    }

    // Initialize theme from localStorage
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'dark') {
            document.body.classList.add('dark');
            const themeIcon = document.getElementById('themeToggle');
            if(themeIcon) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            }
        }
    }

    // Run initialization
    initTheme();
    setupEventListeners();
    
    // Initial strength check
    if(passwordField) {
        checkPasswordStrength();
    }
    
    console.log("Script loaded successfully!");
});
