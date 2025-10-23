document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();

      clearFormErrors();

      const formData = new FormData(this);
      const username = formData.get('username');
      const email = formData.get('email');
      const password = formData.get('password');
      const confirmPassword = formData.get('confirmPassword');

      let isValid = true;

      if (!username || username.length < 3) {
        showFieldError('usernameError', 'O nome de usuário deve ter pelo menos 3 caracteres.');
        isValid = false;
      }

      if (!email || !isValidEmail(email)) {
        showFieldError('emailError', 'Por favor, insira um e-mail válido.');
        isValid = false;
      }

      if (!password || password.length < 6) {
        showFieldError('passwordError', 'A senha deve ter pelo menos 6 caracteres.');
        isValid = false;
      }

      if (password !== confirmPassword) {
        showFieldError('confirmPasswordError', 'As senhas não coincidem.');
        isValid = false;
      }

      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        showFieldError('recaptchaError', 'Por favor, complete o reCAPTCHA.');
        isValid = false;
      }

      if (isValid) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Criando conta...';
        submitBtn.disabled = true;

        setTimeout(() => {
          alert('Conta criada com sucesso!');
          window.location.href = '/cliente/login';
        }, 1500);
      }
    });
  }
});

function clearFormErrors() {
  const errorElements = document.querySelectorAll('.form-error');
  errorElements.forEach(element => {
    element.textContent = '';
  });
}

function showFieldError(fieldId, message) {
  const errorElement = document.getElementById(fieldId);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


