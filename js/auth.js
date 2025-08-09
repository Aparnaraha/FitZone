// Authentication system for the fitness platform

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.init();
    }
    
    init() {
        // Check if user is already logged in
        const savedUser = utils.storage.get('currentUser');
        if (savedUser) {
            this.currentUser = savedUser;
            this.isLoggedIn = true;
            this.updateUI();
        }
        
        this.bindEvents();
    }
    
    bindEvents() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }
        
        // Register form
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', this.handleRegister.bind(this));
        }
        
        // Multi-step form navigation
        this.initMultiStepForm();
        
        // Logout functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('logout-btn')) {
                this.logout();
            }
        });
    }
    
    initMultiStepForm() {
        const form = document.querySelector('.multi-step-form');
        if (!form) return;
        
        const steps = form.querySelectorAll('.step');
        const nextBtns = form.querySelectorAll('.next-step');
        const prevBtns = form.querySelectorAll('.prev-step');
        let currentStep = 1;
        
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.validateStep(currentStep)) {
                    currentStep++;
                    this.showStep(currentStep, steps);
                }
            });
        });
        
        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentStep--;
                this.showStep(currentStep, steps);
            });
        });
    }
    
    showStep(stepNumber, steps) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === stepNumber);
        });
    }
    
    validateStep(stepNumber) {
        const step = document.querySelector(`.step[data-step="${stepNumber}"]`);
        const inputs = step.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }
            
            // Email validation
            if (input.type === 'email' && input.value && !utils.validateEmail(input.value)) {
                this.showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation
            if (input.type === 'tel' && input.value && !utils.validatePhone(input.value)) {
                this.showFieldError(input, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Password validation
            if (input.type === 'password' && input.name === 'password' && input.value && !utils.validatePassword(input.value)) {
                this.showFieldError(input, 'Password must be at least 8 characters with uppercase, lowercase, and number');
                isValid = false;
            }
            
            // Confirm password validation
            if (input.name === 'confirmPassword') {
                const password = step.querySelector('input[name="password"]').value;
                if (input.value !== password) {
                    this.showFieldError(input, 'Passwords do not match');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    showFieldError(input, message) {
        this.clearFieldError(input);
        input.style.borderColor = 'var(--error)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--error);
            font-size: var(--font-size-sm);
            margin-top: var(--spacing-xs);
        `;
        
        input.parentElement.appendChild(errorDiv);
    }
    
    clearFieldError(input) {
        input.style.borderColor = '';
        const errorDiv = input.parentElement.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    async handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        utils.showLoading(submitBtn, 'Signing in...');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Mock authentication
            const user = {
                id: 1,
                email: email,
                firstName: 'John',
                lastName: 'Doe',
                membershipPlan: 'Premium',
                joinDate: '2023-06-15',
                avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
            };
            
            this.login(user);
            utils.showNotification('Welcome back! Login successful.', 'success');
            showPage('dashboard');
            
        } catch (error) {
            utils.showNotification('Login failed. Please try again.', 'error');
        } finally {
            utils.hideLoading(submitBtn);
        }
    }
    
    async handleRegister(e) {
        e.preventDefault();
        
        // Validate all steps
        const steps = e.target.querySelectorAll('.step');
        let isValid = true;
        
        steps.forEach((step, index) => {
            if (!this.validateStep(index + 1)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            utils.showNotification('Please fix the errors in the form.', 'error');
            return;
        }
        
        const formData = new FormData(e.target);
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            fitnessLevel: formData.get('fitnessLevel'),
            plan: formData.get('plan')
        };
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        utils.showLoading(submitBtn, 'Creating account...');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create user object
            const user = {
                id: Date.now(),
                ...userData,
                membershipPlan: userData.plan,
                joinDate: new Date().toISOString().split('T')[0],
                avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
            };
            
            this.login(user);
            utils.showNotification('Account created successfully! Welcome to FitZone.', 'success');
            showPage('dashboard');
            
        } catch (error) {
            utils.showNotification('Registration failed. Please try again.', 'error');
        } finally {
            utils.hideLoading(submitBtn);
        }
    }
    
    login(user) {
        this.currentUser = user;
        this.isLoggedIn = true;
        utils.storage.set('currentUser', user);
        this.updateUI();
    }
    
    logout() {
        this.currentUser = null;
        this.isLoggedIn = false;
        utils.storage.remove('currentUser');
        this.updateUI();
        utils.showNotification('You have been logged out.', 'info');
        showPage('home');
    }
    
    updateUI() {
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');
        const navbar = document.querySelector('.nav-menu');
        
        if (this.isLoggedIn) {
            // Hide login/register buttons
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
            
            // Add user menu if it doesn't exist
            let userMenu = navbar.querySelector('.user-menu');
            if (!userMenu) {
                userMenu = this.createUserMenu();
                const authButtons = navbar.querySelector('.auth-buttons');
                if (authButtons) {
                    authButtons.appendChild(userMenu);
                }
            }
        } else {
            // Show login/register buttons
            if (loginBtn) loginBtn.style.display = 'inline-flex';
            if (registerBtn) registerBtn.style.display = 'inline-flex';
            
            // Remove user menu
            const userMenu = navbar.querySelector('.user-menu');
            if (userMenu) {
                userMenu.remove();
            }
        }
    }
    
    createUserMenu() {
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <div class="user-avatar">
                <img src="${this.currentUser.avatar}" alt="${this.currentUser.firstName}">
            </div>
            <div class="user-dropdown">
                <a href="#dashboard" class="nav-link">Dashboard</a>
                <a href="#profile" class="nav-link">Profile</a>
                <a href="#settings" class="nav-link">Settings</a>
                <button class="logout-btn">Logout</button>
            </div>
        `;
        
        // Add styles
        userMenu.style.cssText = `
            position: relative;
            display: flex;
            align-items: center;
        `;
        
        const userAvatar = userMenu.querySelector('.user-avatar');
        userAvatar.style.cssText = `
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            cursor: pointer;
            border: 2px solid var(--primary);
        `;
        
        const avatarImg = userAvatar.querySelector('img');
        avatarImg.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
        `;
        
        const dropdown = userMenu.querySelector('.user-dropdown');
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            background: var(--white);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            padding: var(--spacing-md);
            min-width: 200px;
            display: none;
            z-index: 1000;
        `;
        
        // Toggle dropdown
        userAvatar.addEventListener('click', () => {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenu.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
        
        return userMenu;
    }
    
    requireAuth(callback) {
        if (this.isLoggedIn) {
            callback();
        } else {
            utils.showNotification('Please log in to access this feature.', 'warning');
            showPage('login');
        }
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
    
    isUserLoggedIn() {
        return this.isLoggedIn;
    }
}

// Initialize authentication system
const auth = new AuthSystem();

// Export auth instance
window.auth = auth;