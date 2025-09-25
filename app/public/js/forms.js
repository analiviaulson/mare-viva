// Forms JavaScript functionality for Maré Viva website

// Form validation utilities
class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = {};
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.clearAllErrors();
        
        if (this.validateForm()) {
            this.submitForm();
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Este campo é obrigatório.';
            isValid = false;
        }
        // Email validation
        else if (fieldType === 'email' && value && !this.isValidEmail(value)) {
            errorMessage = 'Por favor, insira um e-mail válido.';
            isValid = false;
        }
        // Password validation
        else if (fieldType === 'password' && value && value.length < 6) {
            errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
            isValid = false;
        }
        // Text length validation
        else if (field.tagName === 'TEXTAREA' && value && value.length < 20) {
            errorMessage = 'Por favor, forneça mais detalhes (mínimo 20 caracteres).';
            isValid = false;
        }
        // Name validation
        else if (fieldName === 'name' && value && value.length < 2) {
            errorMessage = 'O nome deve ter pelo menos 2 caracteres.';
            isValid = false;
        }
        // Username validation
        else if (fieldName === 'username' && value && value.length < 3) {
            errorMessage = 'O nome de usuário deve ter pelo menos 3 caracteres.';
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        const errorElement = this.getErrorElement(field);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        field.classList.add('error');
        this.errors[field.name] = message;
    }

    clearFieldError(field) {
        const errorElement = this.getErrorElement(field);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        field.classList.remove('error');
        delete this.errors[field.name];
    }

    clearAllErrors() {
        const errorElements = this.form.querySelectorAll('.form-error');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });

        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.classList.remove('error');
        });

        this.errors = {};
    }

    getErrorElement(field) {
        const fieldId = field.id;
        return this.form.querySelector(`#${fieldId}Error`);
    }

    submitForm() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            this.handleFormSuccess();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    handleFormSuccess() {
        // Override this method in specific form implementations
        alert('Formulário enviado com sucesso!');
        this.form.reset();
    }
}

// Login form specific implementation
class LoginForm extends FormValidator {
    handleFormSuccess() {
        alert('Login realizado com sucesso!');
        window.location.href = 'index.html';
    }
}

// Register form specific implementation
class RegisterForm extends FormValidator {
    validateForm() {
        const isValid = super.validateForm();
        
        // Additional validation for password confirmation
        const password = this.form.querySelector('#password');
        const confirmPassword = this.form.querySelector('#confirmPassword');
        
        if (password && confirmPassword) {
            if (password.value !== confirmPassword.value) {
                this.showFieldError(confirmPassword, 'As senhas não coincidem.');
                return false;
            }
        }

        // reCAPTCHA validation (simplified for demo)
        if (typeof grecaptcha !== 'undefined') {
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                const recaptchaError = this.form.querySelector('#recaptchaError');
                if (recaptchaError) {
                    recaptchaError.textContent = 'Por favor, complete o reCAPTCHA.';
                    recaptchaError.style.display = 'block';
                }
                return false;
            }
        }

        return isValid;
    }

    handleFormSuccess() {
        alert('Conta criada com sucesso!');
        window.location.href = 'login.html';
    }
}

// Report form specific implementation
class ReportForm extends FormValidator {
    handleFormSuccess() {
        alert('Denúncia enviada com sucesso! Obrigado por contribuir com a preservação dos oceanos.');
        this.form.reset();
    }
}

// Contact form specific implementation
class ContactForm extends FormValidator {
    handleFormSuccess() {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.form.reset();
    }
}

// Newsletter subscription form
class NewsletterForm extends FormValidator {
    handleFormSuccess() {
        alert('Inscrição realizada com sucesso! Você receberá nossas atualizações por e-mail.');
        this.form.reset();
    }
}

// File upload handling
class FileUploadHandler {
    constructor(input) {
        this.input = input;
        this.maxSize = 10 * 1024 * 1024; // 10MB
        this.allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mov'];
        this.init();
    }

    init() {
        this.input.addEventListener('change', (e) => this.handleFileSelect(e));
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        const validFiles = [];
        const errors = [];

        files.forEach(file => {
            if (this.validateFile(file)) {
                validFiles.push(file);
            } else {
                errors.push(`${file.name}: Arquivo inválido`);
            }
        });

        if (errors.length > 0) {
            alert('Alguns arquivos não puderam ser selecionados:\n' + errors.join('\n'));
        }

        if (validFiles.length > 0) {
            this.displayFilePreview(validFiles);
        }
    }

    validateFile(file) {
        // Check file size
        if (file.size > this.maxSize) {
            return false;
        }

        // Check file type
        if (!this.allowedTypes.includes(file.type)) {
            return false;
        }

        return true;
    }

    displayFilePreview(files) {
        // Create or update file preview container
        let previewContainer = this.input.parentNode.querySelector('.file-preview');
        
        if (!previewContainer) {
            previewContainer = document.createElement('div');
            previewContainer.className = 'file-preview';
            this.input.parentNode.appendChild(previewContainer);
        }

        previewContainer.innerHTML = '';

        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-preview-item';
            
            const fileName = document.createElement('span');
            fileName.textContent = file.name;
            fileName.className = 'file-name';
            
            const fileSize = document.createElement('span');
            fileSize.textContent = this.formatFileSize(file.size);
            fileSize.className = 'file-size';
            
            fileItem.appendChild(fileName);
            fileItem.appendChild(fileSize);
            previewContainer.appendChild(fileItem);
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validators
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        new LoginForm(loginForm);
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        new RegisterForm(registerForm);
    }

    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        new ReportForm(reportForm);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        new ContactForm(contactForm);
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        new NewsletterForm(newsletterForm);
    }

    // Initialize file upload handlers
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        new FileUploadHandler(input);
    });
});

// Export for use in other scripts
window.FormValidator = FormValidator;
window.FileUploadHandler = FileUploadHandler;

