document.addEventListener('DOMContentLoaded', function() {
  const subscribeBtn = document.getElementById('subscribeBtn');
  const modal = document.getElementById('subscriptionModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const subscriptionForm = document.getElementById('subscriptionForm');

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', function() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  if (subscriptionForm) {
    subscriptionForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const interests = formData.get('interests');

      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Processando...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert(`Obrigado, ${name}! Sua inscrição foi realizada com sucesso. Você receberá informações sobre ${interests} em ${email}.`);
        closeModal();
        this.reset();
        submitBtn.textContent = 'Confirmar Inscrição';
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});


