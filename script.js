const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const toast = document.querySelector('.toast');
const year = document.querySelector('#year');
const waitlistForm = document.querySelector('[data-form-type="waitlist"]');
const selectedPlanField = document.querySelector('#selected-plan-field');
const selectedPlanBox = document.querySelector('#selected-plan-box');
const planButtons = document.querySelectorAll('.plan-select');


if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 4200);
}

function updateSelectedPlan(plan) {
  if (!plan) return;

  if (selectedPlanField) {
    selectedPlanField.value = plan;
  }

  if (selectedPlanBox) {
    selectedPlanBox.innerHTML = `
      <span>Selected plan</span>
      <strong>${plan}</strong>
      <small>This plan will be submitted together with the waitlist form.</small>
    `;
  }

  planButtons.forEach((button) => {
    const isSelected = button.dataset.plan === plan;
    button.classList.toggle('selected', isSelected);
    button.closest('.price-card')?.classList.toggle('selected-price', isSelected);
  });
}

planButtons.forEach((button) => {
  button.addEventListener('click', () => {
    updateSelectedPlan(button.dataset.plan);
    showToast(`${button.dataset.plan} selected`);
  });
});

if (selectedPlanField) {
  selectedPlanField.addEventListener('change', () => updateSelectedPlan(selectedPlanField.value));
}

if (waitlistForm) {
  waitlistForm.addEventListener('submit', (event) => {
    if (selectedPlanField && !selectedPlanField.value) {
      event.preventDefault();
      showToast('Please select a pricing plan before submitting.');
      selectedPlanField.focus();
      return;
    }

    showToast('Sending waitlist request...');
  });
}
