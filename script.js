// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    
    // Get all DOM elements
    const passwordField = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const themeToggleBtn = document.getElementById('themeToggle');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    const loginForm = document.getElementById('loginForm');
    const customWordInput = document.getElementById('customWord');
    const generateCustomBtn = document.getElementById('generateCustomBtn');
    const generateRandomBtn = document.getElementById('generateRandomBtn');
    const generatedPasswordSpan = document.getElementById('generatedPassword');
    const copyIcon = document.getElementById('copyPasswordIcon');

    // Toast notification function
    function showToastMessage(message, isError = false) {
        const existingToast = document.querySelector('.alert-toast');
        if(existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'alert-toast';
        toast.style.background = isError ? '#dc2626' : '#1f3a5f';
        toast.style.color = '#fff';
        toast.style.fontWeight = '500';
        toast.innerHTML = `<i class="fa-solid ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'}" style="margin-right: 8px;"></i> ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if(toast && toast.remove) toast.remove();
        }, 2200);
    }

    // Password strength checker
    function checkPasswordStrength() {
        const password = passwordField.value;
        let score = 0;
        
        if(!password) {
            strengthFill.style.width = '0%';
            strengthFill.style.background = '#e2e8f0';
            strengthText.innerHTML = '🔒 Password Strength';
            return;
        }
        
        if(password.length >= 8) score += 20;
        if(password.length >= 12) score += 10;
        if(/[A-Z]/.test(password)) score += 20;
        if(/[a-z]/.test(password)) score += 10;
        if(/[0-9]/.test(password)) score += 20;
        if(/[^A-Za-z0-9]/.test(password)) score += 25;
        
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
            strengthText.innerHTML = '❌ Weak Password';
        } else if(score <= 65) {
            strengthFill.style.background = '#f97316';
            strengthText.innerHTML = '⚠️ Medium Password';
        } else {
            strengthFill.style.background = '#22c55e';
            strengthText.innerHTML = '✅ Strong Password';
        }
    }

    // Generate custom password function
    function generateCustomPassword() {
        const name = customWordInput.value.trim();
        
        if(name === "") {
            showToastMessage("Please enter a name or word first!", true);
            return;
        }

        const symbols = "!@#$%^&*";
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const randomSymbol2 = symbols[Math.floor(Math.random() * symbols.length)];
        
        const password = name.charAt(0).toUpperCase() + name.slice(1) + randomSymbol + randomNumber + randomSymbol2;
        
        generatedPasswordSpan.innerText = password;
        showToastMessage("Custom password generated!", false);
    }

    // Generate random password function
    function generateRandomPassword() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let password = "";

        for(let i = 0; i < 14; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        generatedPasswordSpan.innerText = password;
        showToastMessage("Random strong password generated!", false);
    }

    // Copy password function
    async function copyPassword() {
        const password = generatedPasswordSpan.innerText;
        
        if(password === "✨ Click a button to generate password") {
            showToastMessage("Nothing to copy! Generate a password first.", true);
            return;
        }
        
        try {
            await navigator.clipboard.writeText(password);
            showToastMessage("Password copied to clipboard!", false);
            
            // Change icon temporarily
            const originalIcon = copyIcon.innerHTML;
            copyIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => {
                copyIcon.innerHTML = originalIcon;
            }, 1000);
        } catch(err) {
            showToastMessage("Failed to copy password!", true);
        }
    }

    // Toggle password visibility
    function togglePasswordVisibility() {
        if(passwordField.type === "password") {
            passwordField.type = "text";
            togglePasswordBtn.classList.remove("fa-eye");
            togglePasswordBtn.classList.add("fa-eye-slash");
        } else {
            passwordField.type = "password";
            togglePasswordBtn.classList.remove("fa-eye-slash");
            togglePasswordBtn.classList.add("fa-eye");
        }
    }

    // Theme toggle
    function toggleTheme() {
        document.body.classList.toggle("dark");
        const themeIcon = themeToggleBtn.querySelector('i');
        
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

    // Login handler
    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = passwordField.value;
        
        if(!username) {
            showToastMessage("Please enter username or email", true);
            return;
        }
        if(!password) {
            showToastMessage("Please enter password", true);
            return;
        }
        
        showToastMessage(`Welcome ${username}! Login successful (demo)`, false);
    }

    // Initialize theme from localStorage
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'dark') {
            document.body.classList.add('dark');
            const themeIcon = themeToggleBtn.querySelector('i');
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    }

    // Add all event listeners
    passwordField.addEventListener('input', checkPasswordStrength);
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    themeToggleBtn.addEventListener('click', toggleTheme);
    loginForm.addEventListener('submit', handleLogin);
    generateCustomBtn.addEventListener('click', generateCustomPassword);
    generateRandomBtn.addEventListener('click', generateRandomPassword);
    copyIcon.addEventListener('click', copyPassword);
    
    // Optional: Press Enter in custom word field to generate
    customWordInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            e.preventDefault();
            generateCustomPassword();
        }
    });

    // Initial calls
    initTheme();
    checkPasswordStrength();
    
    console.log("✅ Script loaded successfully! All buttons should work.");
});
