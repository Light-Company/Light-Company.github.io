const form = document.querySelector('[data-preorder-form]');
const submit = document.querySelector('[data-submit]');
const status = document.querySelector('[data-form-status]');
let submitting = false;

// Native validation must be able to focus an invalid optional field after its section is collapsed.
form?.addEventListener('invalid', event => {
  const disclosure = event.target.closest('details');
  if (disclosure) disclosure.open = true;
}, true);

function clearErrors() {
  form.querySelectorAll('[aria-invalid]').forEach(input => {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
  });
  form.querySelectorAll('.field-error').forEach(message => {
    message.hidden = true;
    message.textContent = '';
  });
  status.hidden = true;
  status.textContent = '';
}

function showError(message, fields = {}) {
  status.textContent = message;
  status.hidden = false;
  let firstInvalid;
  for (const [name, error] of Object.entries(fields)) {
    const input = form.elements.namedItem(name);
    const feedback = document.getElementById(`${name}-error`);
    if (!(input instanceof HTMLElement) || !feedback || typeof error !== 'string') continue;
    const disclosure = input.closest('details');
    if (disclosure) disclosure.open = true;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', feedback.id);
    feedback.textContent = error;
    feedback.hidden = false;
    firstInvalid ??= input;
  }
  (firstInvalid ?? status).focus();
}

form?.addEventListener('submit', async event => {
  event.preventDefault();
  if (submitting || !form.reportValidity()) return;
  clearErrors();
  submitting = true;
  submit.disabled = true;
  submit.textContent = 'Saving your details…';
  form.setAttribute('aria-busy', 'true');
  const data = Object.fromEntries(new FormData(form));
  data.updatesOptIn = form.elements.namedItem('updatesOptIn').checked;
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(20000),
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) {
      showError(result.message || 'We couldn’t save your details. Please try again.', result.fields);
      return;
    }
    document.querySelector('[data-form-content]').hidden = true;
    const success = document.querySelector('[data-success]');
    success.hidden = false;
    success.focus();
  } catch {
    showError('We couldn’t confirm your details were saved. Please try again, or email jon@lightcompany.ai.');
  } finally {
    submitting = false;
    submit.disabled = false;
    submit.textContent = 'Join the preorder list';
    form.removeAttribute('aria-busy');
  }
});
