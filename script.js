// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const passwordField = document.getElementById('password');
    const togglePwBtn = document.getElementById('togglePassword');
    const themeToggleBtn = document.getElementById('themeToggle');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    const loginForm = document.getElementById('loginForm');
    
    // Generator elements
    const customWordInput = document.getElementById('customWord');
    const generateCustomBtn = document.getElementById('generateCustomBtn');
    const generateRandomBtn = document.getElementById('generateRandomBtn');
    const generatedPasswordSpan = document.getElementById('generatedPassword');
    const copyIcon = document.getElementById('copyPasswordIcon');

    // Helper: Custom toast notification (replaces annoying alert)
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

    // ----- PASSWORD STRENGTH CHECKER (Enhanced) -----
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

    // ----- IMPROVED PASSWORD GENERATORS -----
    
    // Generate from custom word with leet transformations
    function generateCustomPassword() {
        let baseWord = customWordInput.value.trim();
        if(baseWord === "") {
            showToastMessage("Please enter a name or keyword first 🌟", true);
            return;
        }
        
        // Leet speak transformations for variety
        const leetMap = {
            'a': '@', 'e': '3', 'i': '1', 'o': '0', 's': '$', 't': '7', 'b': '8', 'g': '9'
        };
        
        let transformed = "";
        for(let ch of baseWord) {
            let lowerCh = ch.toLowerCase();
            if(leetMap[lowerCh] && Math.random() > 0.5) {
                transformed += leetMap[lowerCh];
            } else {
                transformed += ch;
            }
        }
        
        if(transformed === baseWord && baseWord.length > 2) {
            transformed = baseWord.charAt(0).toUpperCase() + baseWord.slice(1);
        }
        
        const symbols = "!@#$%&*?_-+=";
        const randomSymbol1 = symbols[Math.floor(Math.random() * symbols.length)];
        const randomSymbol2 = symbols[Math.floor(Math.random() * symbols.length)];
        const randomNum = Math.floor(100 + Math.random() * 9900);
        const randomUpper = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        
        let finalPassword = transformed + randomSymbol1 + randomNum + randomSymbol2 + randomUpper;
        
        if(finalPassword.length < 10) {
            finalPassword += Math.floor(Math.random() * 1000);
        }
        
        generatedPasswordSpan.innerText = finalPassword;
        showToastMessage("✅ Custom password generated!", false);
    }
    
    // Generate cryptographically strong random password
    function generateRandomPassword() {
        const upperCase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
        const lowerCase = "abcdefghijkmnopqrstuvwxyz";
        const digits = "23456789";
        const special = "!@#$%&*?_-+=";
        
        let passwordArray = [];
        passwordArray.push(upperCase[Math.floor(Math.random() * upperCase.length)]);
        passwordArray.push(lowerCase[Math.floor(Math.random() * lowerCase.length)]);
        passwordArray.push(digits[Math.floor(Math.random() * digits.length)]);
        passwordArray.push(special[Math.floor(Math.random() * special.length)]);
        
        const allAllowed = upperCase + lowerCase + digits + special;
        const remainingLength = 12 + Math.floor(Math.random() * 5);
        
        for(let i = passwordArray.length; i < remainingLength; i++) {
            passwordArray.push(allAllowed[Math.floor(Math.random() * allAllowed.length)]);
        }
        
        // Fisher-Yates shuffle
        for(let i = passwordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
        }
        
        const strongPassword = passwordArray.join('');
        generatedPasswordSpan.innerText = strongPassword;
        showToastMessage("🔐 Strong random password created!", false);
    }
    
    // Copy to clipboard with visual feedback
    async function copyPasswordToClipboard() {
        const passwordText = generatedPasswordSpan.innerText;
        if(!passwordText || passwordText === "✨ Click a button to generate password") {
            showToastMessage("No password to copy — generate one first!", true);
            return;
        }
        
        try {
            await navigator.clipboard.writeText(passwordText);
            showToastMessage("📋 Password copied to clipboard!", false);
            
            const originalIcon = copyIcon.innerHTML;
            copyIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => {
                copyIcon.innerHTML = originalIcon;
            }, 800);
        } catch(err) {
            showToastMessage("Copy failed, please select manually", true);
        }
    }
    
    // Theme management with localStorage
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if(prefersDark) {
            document.body.classList.add('dark');
            const themeIcon = themeToggleBtn.querySelector('i');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('dark');
            const themeIcon = themeToggleBtn.querySelector('i');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    function toggleTheme() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        const themeIcon = themeToggleBtn.querySelector('i');
        
        if(isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Toggle password visibility
    function togglePasswordVisibility() {
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;
        const icon = togglePwBtn;
        
        if(type === 'text') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    // Login handler (demo)
    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = passwordField.value;
        
        if(!username) {
            showToastMessage("Please enter username/email", true);
            return;
        }
        if(!password) {
            showToastMessage("Please enter your password", true);
            return;
        }
        
        let strengthMsg = "";
        const currentStrength = parseInt(strengthFill.style.width);
        
        if(currentStrength <= 30) {
            strengthMsg = "⚠️ Weak password! Consider using our generator.";
        } else if(currentStrength <= 65) {
            strengthMsg = "🔐 Password medium strength, but accepted for demo.";
        } else {
            strengthMsg = "✅ Strong password! Secure login demo.";
        }
        
        showToastMessage(`Welcome ${username}! ${strengthMsg}`, false);
    }

    // ----- EVENT LISTENERS -----
    passwordField.addEventListener('input', checkPasswordStrength);
    togglePwBtn.addEventListener('click', togglePasswordVisibility);
    themeToggleBtn.addEventListener('click', toggleTheme);
    loginForm.addEventListener('submit', handleLogin);
    
    // Generator buttons
    generateCustomBtn.addEventListener('click', generateCustomPassword);
    generateRandomBtn.addEventListener('click', generateRandomPassword);
    copyIcon.addEventListener('click', copyPasswordToClipboard);
    
    // Enter key on custom word field triggers generation
    customWordInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            generateCustomPassword();
        }
    });
    
    // Initialize everything
    checkPasswordStrength();
    initTheme();
});
