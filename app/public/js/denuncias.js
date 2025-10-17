document.addEventListener('DOMContentLoaded', function() {
  const reportForm = document.getElementById('reportForm');

  if (reportForm) {
    reportForm.addEventListener('submit', function(e) {
      e.preventDefault();

      clearFormErrors();

      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const report = formData.get('report');

      let isValid = true;

      if (!name || name.length < 2) {
        showFieldError('nameError', 'Por favor, insira seu nome completo.');
        isValid = false;
      }

      if (!email || !isValidEmail(email)) {
        showFieldError('emailError', 'Por favor, insira um e-mail válido.');
        isValid = false;
      }

      if (!report || report.length < 20) {
        showFieldError('reportError', 'Por favor, descreva a denúncia com mais detalhes (mínimo 20 caracteres).');
        isValid = false;
      }

      if (isValid) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        setTimeout(() => {
          alert('Denúncia enviada com sucesso! Obrigado por contribuir com a preservação dos oceanos.');
          this.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2000);
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


