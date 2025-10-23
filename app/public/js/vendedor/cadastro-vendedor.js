document.addEventListener('DOMContentLoaded', function() {
  const cadastroForm = document.getElementById('cadastroVendedorForm');

  if (cadastroForm) {
    cadastroForm.addEventListener('submit', function(e) {
      e.preventDefault();

      clearFormErrors();

      const formData = new FormData(this);
      const nomeEmpresa = formData.get('nomeEmpresa');
      const nomeResponsavel = formData.get('nomeResponsavel');
      const email = formData.get('email');
      const telefone = formData.get('telefone');
      const password = formData.get('password');
      const confirmPassword = formData.get('confirmPassword');

      let isValid = true;

      if (!nomeEmpresa || nomeEmpresa.trim().length < 3) {
        showFieldError('nomeEmpresaError', 'Nome da empresa deve ter pelo menos 3 caracteres.');
        isValid = false;
      }
      if (!nomeResponsavel || nomeResponsavel.trim().length < 3) {
        showFieldError('nomeResponsavelError', 'Nome do responsável deve ter pelo menos 3 caracteres.');
        isValid = false;
      }
      if (!email || !isValidEmail(email)) {
        showFieldError('emailError', 'Por favor, insira um e-mail válido.');
        isValid = false;
      }
      if (!telefone || telefone.trim().length < 10) {
        showFieldError('telefoneError', 'Por favor, insira um telefone válido.');
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

      if (isValid) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Criando conta...';
        submitBtn.disabled = true;
        setTimeout(() => {
          alert('Conta de vendedor criada com sucesso! Você será redirecionado para o login.');
          window.location.href = '/vendedor/login';
        }, 1500);
      }
    });
  }
});

function clearFormErrors() {
  const errorElements = document.querySelectorAll('.form-error');
  errorElements.forEach(element => { element.textContent = ''; });
}

function showFieldError(fieldId, message) {
  const errorElement = document.getElementById(fieldId);
  if (errorElement) { errorElement.textContent = message; }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


