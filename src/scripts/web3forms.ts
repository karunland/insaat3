/**
 * Web3Forms gönderimi (progressive enhancement). İşaretleme: Web3Form.astro
 */
const ENDPOINT = 'https://api.web3forms.com/submit';

type Tone = 'success' | 'error' | 'info';

const TONE_CLASSES: Record<Tone, string> = {
  success: 'border-l-4 border-ink bg-concrete-100 p-4 text-ink',
  error: 'border-l-4 border-signal-600 bg-white p-4 text-signal-700',
  info: 'p-1 text-concrete-700',
};

function showStatus(form: HTMLFormElement, message: string, tone: Tone) {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  if (!status) return;
  status.className = `mt-6 ${TONE_CLASSES[tone]}`;
  status.textContent = message;
  if (tone !== 'info') {
    status.tabIndex = -1;
    status.focus();
  }
}

export function initWeb3Forms(): void {
  for (const form of document.querySelectorAll<HTMLFormElement>('form[data-web3forms]')) {
    if (form.dataset.web3formsReady) continue;
    form.dataset.web3formsReady = 'true';

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const messages = form.dataset;
      const data = new FormData(form);

      if (!data.get('access_key')) {
        showStatus(form, messages.msgNotConfigured ?? '', 'error');
        return;
      }

      const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (submit) {
        submit.disabled = true;
        submit.setAttribute('aria-busy', 'true');
      }
      showStatus(form, messages.msgSending ?? '', 'info');

      try {
        // JSON gönderimde redirect alanı yok sayılır; sonucu sayfada gösteriyoruz.
        data.delete('redirect');
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(data)),
        });
        const result = (await response.json()) as { success?: boolean };
        if (!response.ok || !result.success) throw new Error('Web3Forms error');

        form.reset();
        form.dispatchEvent(new CustomEvent('web3forms:success'));
        showStatus(form, messages.msgSuccess ?? '', 'success');
      } catch {
        showStatus(form, messages.msgError ?? '', 'error');
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.removeAttribute('aria-busy');
        }
      }
    });
  }
}
