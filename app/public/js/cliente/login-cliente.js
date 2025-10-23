document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      clearFormErrors();

      const formData = new FormData(this);
      const email = formData.get('email');
      const password = formData.get('password');

      let isValid = true;

      if (!email || !isValidEmail(email)) {
        showFieldError('emailError', 'Por favor, insira um e-mail válido.');
        isValid = false;
      }

      if (!password || password.length < 6) {
        showFieldError('passwordError', 'A senha deve ter pelo menos 6 caracteres.');
        isValid = false;
      }

      if (isValid) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Entrando...';
        submitBtn.disabled = true;

        setTimeout(() => {
          alert('Login realizado com sucesso!');
          window.location.href = '/loja';
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



