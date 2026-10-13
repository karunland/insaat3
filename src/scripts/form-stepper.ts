/**
 * Çok adımlı form. İşaretleme: RenewalForm.astro
 *
 *   form[data-stepper]
 *     ol[data-step-indicator] > li           (adım göstergesi)
 *     fieldset[data-step] ...                 (her adım)
 *       button[data-step-back|data-step-next] (JS yokken gizli)
 *
 * JS yoksa tüm adımlar alt alta görünür ve form tek seferde gönderilir.
 * "İleri" yalnızca o adımdaki zorunlu alanlar geçerliyse ilerler.
 */
export function initFormSteppers(): void {
  for (const form of document.querySelectorAll<HTMLFormElement>('form[data-stepper]')) {
    if (form.dataset.stepperReady) continue;
    form.dataset.stepperReady = 'true';

    const steps = [...form.querySelectorAll<HTMLFieldSetElement>('[data-step]')];
    const indicators = [...form.querySelectorAll<HTMLElement>('[data-step-indicator] li')];
    const progress = form.querySelector<HTMLElement>('[data-step-progress]');
    let current = 0;

    function go(index: number, moveFocus: boolean) {
      current = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach((step, i) => (step.hidden = i !== current));
      indicators.forEach((item, i) => {
        item.dataset.state = i < current ? 'done' : i === current ? 'current' : 'todo';
        if (i === current) item.setAttribute('aria-current', 'step');
        else item.removeAttribute('aria-current');
      });
      if (progress) {
        progress.textContent = (progress.dataset.template ?? '')
          .replace('{current}', String(current + 1))
          .replace('{total}', String(steps.length));
      }
      if (moveFocus) steps[current].querySelector<HTMLElement>('[data-step-title]')?.focus();
    }

    function isStepValid(step: HTMLElement): boolean {
      const fields = step.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        'input, select, textarea',
      );
      for (const field of fields) {
        if (!field.checkValidity()) {
          field.reportValidity();
          return false;
        }
      }
      return true;
    }

    form.addEventListener('click', (event) => {
      const button = (event.target as HTMLElement).closest('button');
      if (!button) return;
      if (button.matches('[data-step-next]') && isStepValid(steps[current])) go(current + 1, true);
      if (button.matches('[data-step-back]')) go(current - 1, true);
    });

    // Son adımdan önce Enter tuşu formu göndermesin; "İleri" gibi davransın.
    form.addEventListener('keydown', (event) => {
      const target = event.target as HTMLElement;
      if (event.key !== 'Enter' || target instanceof HTMLTextAreaElement || target instanceof HTMLButtonElement) return;
      if (current < steps.length - 1) {
        event.preventDefault();
        if (isStepValid(steps[current])) go(current + 1, true);
      }
    });

    form.addEventListener('web3forms:success', () => go(0, false));

    form.querySelectorAll<HTMLElement>('[data-step-nav]').forEach((el) => (el.hidden = false));
    form.querySelector<HTMLElement>('[data-step-indicator]')?.removeAttribute('hidden');
    go(0, false);
  }
}
